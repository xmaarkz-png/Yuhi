/**
 * Vercel Serverless Function — SerpApi proxy
 *
 * Handles all requests to /api/serpapi
 * Forwards to https://serpapi.com/search and injects the server-side API key.
 *
 * Required env variable (set in Vercel dashboard):
 *   SERPAPI_KEY=<your serpapi key>
 */
export default async function handler(req, res) {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'SERPAPI_KEY environment variable is not set.' });
  }

  const targetUrl = new URL('https://serpapi.com/search');

  // Forward all query params from the client and inject the API key
  for (const [key, value] of Object.entries(req.query)) {
    targetUrl.searchParams.set(key, value);
  }
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
