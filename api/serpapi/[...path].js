/**
 * Vercel Serverless Function — SerpApi proxy
 *
 * Handles: /api/serpapi/*
 * Forwards requests to https://serpapi.com/* and injects the server-side API key.
 *
 * Required env variable (set in Vercel dashboard):
 *   SERPAPI_KEY=<your serpapi key>
 */
export default async function handler(req, res) {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'SERPAPI_KEY environment variable is not set.' });
  }

  // req.query.path is the catch-all array, e.g. ['search']
  const pathSegments = req.query.path || [];
  const subPath = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

  // Build the target SerpApi URL
  const targetUrl = new URL(`https://serpapi.com/${subPath}`);

  // Forward all query params (except Vercel's internal 'path' param)
  const { path: _ignored, ...queryParams } = req.query;
  for (const [key, value] of Object.entries(queryParams)) {
    targetUrl.searchParams.set(key, value);
  }
  // Inject server-side key — never exposed to the browser
  targetUrl.searchParams.set('api_key', apiKey);

  try {
    const upstream = await fetch(targetUrl.toString(), {
      headers: { 'User-Agent': 'Yuhi/1.0' },
    });

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const body = await upstream.text();

    res.setHeader('Content-Type', contentType);
    res.status(upstream.status).send(body);
  } catch (err) {
    console.error('[serpapi proxy] fetch error:', err);
    res.status(502).json({ error: 'Failed to reach SerpApi.' });
  }
}
