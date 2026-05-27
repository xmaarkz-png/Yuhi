/**
 * API Service Layer — Price Comparison
 *
 * Supported sources:
 *  1. SerpApi (Google Shopping) — returns multi-store prices
 *  2. Elimapi (Taobao/1688) — optional provider (deprecated)
 */

const SERPAPI_BASE = '/api/serpapi';
const ELIMAPI_BASE = '/api/elimapi';

// ─── Config ──────────────────────────────────────────────────────────────────
// Store your keys in a .env file:
//   VITE_SERPAPI_KEY=your_key
//   VITE_ELIMAPI_KEY=c873a0b1df40c3818f917ed3001a3cf007102f5f
//   VITE_AMAZON_AFFILIATE_TAG=your_tag
const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY || '';
const ELIMAPI_KEY = import.meta.env.VITE_ELIMAPI_KEY || '';
const AMAZON_TAG = import.meta.env.VITE_AMAZON_AFFILIATE_TAG || 'yuhi00-21';

// TMAPI removed — use SerpApi for Amazon/Marketplace searches

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
  return items.slice(0, 20).map(normalizeSerpapi);
}

/**
 * Generic product search wrapper used by UI components.
 * Returns normalized products from SerpApi (or empty array on error).
 */
export async function searchProducts(query, limit = 10) {
  if (!query) return [];
  try {
    const results = await searchGoogleShopping(query);
    const slice = results.slice(0, limit);
    addProductsToCache(slice);
    return slice;
  } catch (err) {
    console.warn('searchProducts error', err);
    return [];
  }
}

// Simple in-memory cache of products fetched from the API during this session.
// Keyed by `id` when available, otherwise by normalized title.
const productCache = new Map();
const LOCAL_STORAGE_KEY = 'yuhi_product_cache_v1';
const MAX_CACHE_ENTRIES = 500;

function persistCacheToLocalStorage() {
  try {
    const arr = Array.from(productCache.values());
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    // ignore storage errors (private mode, quota)
    console.warn('Could not persist product cache', e);
  }
}

function loadCacheFromLocalStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return;
    for (const p of arr) {
      const key = cacheKeyForProduct(p);
      if (!key) continue;
      productCache.set(key, p);
    }
  } catch (e) {
    console.warn('Could not load product cache', e);
  }
}

// Load persisted cache immediately
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  loadCacheFromLocalStorage();
}

function cacheKeyForProduct(p) {
  if (!p) return null;
  return p.id || (p.title && p.title.toLowerCase().trim()) || null;
}

export function addProductsToCache(products) {
  if (!Array.isArray(products)) return;
  for (const p of products) {
    const key = cacheKeyForProduct(p);
    if (!key) continue;
    // store a shallow copy to avoid mutations
    productCache.set(key, { ...p });
    // Evict oldest entries if cache grows too large
    if (productCache.size > MAX_CACHE_ENTRIES) {
      const it = productCache.keys();
      const oldestKey = it.next().value;
      if (oldestKey) productCache.delete(oldestKey);
    }
  }
  // Persist after batch add
  try { persistCacheToLocalStorage(); } catch {}
}

export function getCachedProductsByQuery(query, limit = 10) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  const all = Array.from(productCache.values());
  const filtered = all.filter((p) => p && p.title && p.title.toLowerCase().includes(q));
  return filtered.slice(0, limit);
}

// Return all cached products (most recent last -> we reverse for recent-first consumers)
export function getAllCachedProducts() {
  try {
    return Array.from(productCache.values());
  } catch (e) {
    console.warn('getAllCachedProducts error', e);
    return [];
  }
}

// ─── Elimapi — Taobao/1688 search ──────────────────────────────────────────
// Elimapi removed: project uses SerpApi as primary external search provider
export async function searchElimapi(keyword) {
  console.warn('searchElimapi is deprecated in this build — use SerpApi only');
  return [];
}

// ─── Normalizers ─────────────────────────────────────────────────────────────
// (TMAPI support was removed)

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
    // `store` normalized so the UI can identify the source consistently
    store: (raw.source && String(raw.source).toLowerCase().replace(/\s+/g, '')) || (function(){
      try { const u = new URL(raw.link || raw.product_link); return u.hostname.replace(/^www\./,''); } catch { return 'google_shopping'; }
    })(),
  };
}

function normalizeElimapi(raw) {
  return {
    id: raw.product_id || raw.id,
    source: 'Taobao',
    sourceIcon: '🇨🇳',
    title: raw.title,
    price: parsePrice(raw.price),
    originalPrice: parsePrice(raw.original_price),
    image: raw.main_image || raw.thumbnail || '',
    rating: raw.rating || null,
    reviews: raw.reviews_count || 0,
    url: raw.url || '#',
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
    searchGoogleShopping(keyword),
    searchElimapi(keyword),
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
