/**
 * API Service Layer — Price Comparison
 *
 * Supported sources:
 *  1. TMAPI (Amazon via tmapi.top)  — item_detail_by_url
 *  2. SerpApi (Google Shopping)     — returns multi-store prices in one call
 */

const TMAPI_BASE = '/api/tmapi';
const SERPAPI_BASE = '/api/serpapi';

// ─── Config ──────────────────────────────────────────────────────────────────
// Store your keys in a .env file:
//   VITE_TMAPI_KEY=your_key
//   VITE_SERPAPI_KEY=your_key
//   VITE_AMAZON_AFFILIATE_TAG=your_tag
const TMAPI_KEY = import.meta.env.VITE_TMAPI_KEY || '';
const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY || '';
const AMAZON_TAG = import.meta.env.VITE_AMAZON_AFFILIATE_TAG || 'yuhi00-21';

// ─── TMAPI — Amazon product detail by URL ────────────────────────────────────
export async function fetchAmazonByUrl(productUrl) {
  const params = new URLSearchParams({
    url: productUrl,
    ...(TMAPI_KEY && { api_key: TMAPI_KEY }),
  });
  const res = await fetch(`${TMAPI_BASE}/amazon/item_detail_by_url?${params}`);
  if (!res.ok) throw new Error(`TMAPI error: ${res.status}`);
  const data = await res.json();
  return normalizeTmapi(data, productUrl);
}

// ─── TMAPI — Amazon search by keyword ────────────────────────────────────────
export async function searchAmazon(keyword) {
  const params = new URLSearchParams({
    keyword,
    country: 'ES',
    ...(TMAPI_KEY && { api_key: TMAPI_KEY }),
  });
  const res = await fetch(`${TMAPI_BASE}/amazon/search?${params}`);
  if (!res.ok) throw new Error(`TMAPI search error: ${res.status}`);
  const data = await res.json();
  const items = data?.data?.products || data?.products || [];
  return items.slice(0, 6).map((p) => normalizeTmapi(p, p.url || p.link));
}

// ─── SerpApi — Google Shopping (multi-store prices) ──────────────────────────
export async function searchGoogleShopping(keyword) {
  if (!SERPAPI_KEY) {
    console.warn('No SERPAPI_KEY set — SerpApi results skipped');
    return [];
  }
  const params = new URLSearchParams({
    engine: 'google_shopping',
    q: keyword,
    gl: 'es',
    hl: 'es',
    api_key: SERPAPI_KEY,
  });
  const res = await fetch(`${SERPAPI_BASE}/search?${params}`);
  if (!res.ok) throw new Error(`SerpApi error: ${res.status}`);
  const data = await res.json();
  const items = data?.shopping_results || [];
  return items.slice(0, 6).map(normalizeSerpapi);
}

// ─── Normalizers ─────────────────────────────────────────────────────────────
function normalizeTmapi(raw, url) {
  return {
    id: raw.asin || raw.id || url,
    source: 'Amazon',
    sourceIcon: '🛒',
    title: raw.title || raw.name || 'Producto Amazon',
    price: parsePrice(raw.price || raw.sale_price || raw.current_price),
    originalPrice: parsePrice(raw.original_price || raw.list_price),
    image: raw.main_image || raw.image || raw.thumbnail || '',
    rating: raw.rating || null,
    reviews: raw.reviews_count || raw.review_count || 0,
    url: buildAffiliateUrl(url || raw.url || raw.link, 'amazon'),
    currency: raw.currency || '€',
    inStock: raw.availability !== 'Out of Stock',
    badge: raw.badge || null,
  };
}

function normalizeSerpapi(raw) {
  return {
    id: raw.product_id || raw.position,
    source: raw.source || 'Google Shopping',
    sourceIcon: '🛍️',
    title: raw.title,
    price: parsePrice(raw.price),
    originalPrice: parsePrice(raw.extracted_price ? null : null),
    image: raw.thumbnail || '',
    rating: raw.rating || null,
    reviews: raw.reviews || 0,
    url: buildAffiliateUrl(raw.link || raw.product_link, 'google'),
    currency: '€',
    inStock: true,
    badge: null,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parsePrice(val) {
  if (!val) return null;
  if (typeof val === 'number') return val;
  const cleaned = String(val).replace(/[^0-9.,]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Appends a simple referral/affiliate tag to outbound URLs.
 * Uses VITE_AMAZON_AFFILIATE_TAG from .env
 */
function buildAffiliateUrl(url, store) {
  if (!url) return '#';
  try {
    const u = new URL(url);
    if (store === 'amazon') {
      u.searchParams.set('tag', AMAZON_TAG);
    }
    return u.toString();
  } catch {
    return url;
  }
}

// ─── Parallel price comparison ────────────────────────────────────────────────
/**
 * Searches all available sources in parallel and returns a merged,
 * price-sorted list of results grouped by source.
 */
export async function compareAllSources(keyword) {
  const results = await Promise.allSettled([
    searchAmazon(keyword),
    searchGoogleShopping(keyword),
  ]);

  const all = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }

  // Sort by price ascending (null prices go last)
  all.sort((a, b) => {
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return a.price - b.price;
  });

  return all;
}

/**
 * Search for a specific product by title and return the cheapest prices across sources.
 * Used to fetch live prices for catalog products.
 */
export async function fetchPricesForProduct(productTitle) {
  try {
    const results = await compareAllSources(productTitle);
    return results.slice(0, 4); // Return top 4 results (cheapest first)
  } catch (error) {
    console.error(`Error fetching prices for "${productTitle}":`, error);
    return [];
  }
}

// ─── Demo / mock data (used when no API keys are set) ────────────────────────
export function getMockResults(keyword) {
  const base = keyword.toLowerCase();
  return [
    {
      id: 'mock-1',
      source: 'Amazon',
      sourceIcon: '🛒',
      title: `Ramen Picante Especial ${keyword}`,
      price: 4.99,
      originalPrice: 6.50,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
      rating: 4.5,
      reviews: 1240,
      url: `https://www.amazon.es/s?k=${encodeURIComponent(base)}&tag=yuhi00-21`,
      currency: '€',
      inStock: true,
      badge: 'Más vendido',
    },
    {
      id: 'mock-2',
      source: 'Google Shopping',
      sourceIcon: '🛍️',
      title: `Ramen Miso Clásico ${keyword}`,
      price: 5.40,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
      rating: 4.2,
      reviews: 870,
      url: `https://shopping.google.com/search?q=${encodeURIComponent(base)}`,
      currency: '€',
      inStock: true,
      badge: null,
    },
    {
      id: 'mock-3',
      source: 'AliExpress',
      sourceIcon: '🏪',
      title: `${keyword} - Edición Especial`,
      price: 3.20,
      originalPrice: 8.00,
      image: 'https://images.unsplash.com/photo-1612360862453-c8e03fecf0da?w=300',
      rating: 4.0,
      reviews: 3500,
      url: `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(base)}`,
      currency: '€',
      inStock: true,
      badge: 'Oferta -60%',
    },
    {
      id: 'mock-4',
      source: 'eBay',
      sourceIcon: '🔖',
      title: `${keyword} Importado Japón`,
      price: 6.99,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300',
      rating: 3.8,
      reviews: 290,
      url: `https://www.ebay.es/sch/i.html?_nkw=${encodeURIComponent(base)}`,
      currency: '€',
      inStock: true,
      badge: null,
    },
    {
      id: 'mock-5',
      source: 'Amazon',
      sourceIcon: '🛒',
      title: `Set Degustación ${keyword} Premium`,
      price: 12.99,
      originalPrice: 15.99,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300',
      rating: 4.8,
      reviews: 612,
      url: `https://www.amazon.es/s?k=${encodeURIComponent(base)}&tag=yuhi00-21`,
      currency: '€',
      inStock: false,
      badge: null,
    },
  ];
}
