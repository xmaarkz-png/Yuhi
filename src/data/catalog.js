/**
 * Catálogo curado de productos populares de cultura asiática/otaku.
 *
 * INSTRUCCIONES PARA AFILIADOS:
 *  - Amazon:     Sustituye la URL base y añade ?tag=TU_TAG_AQUI
 *  - AliExpress: Genera el enlace desde el portal Portals.aliexpress.com
 *  - CDJapan:    Regístrate en cdJapan.co.jp/affiliate y genera el enlace
 *  - Play-Asia:  Programa en play-asia.com/affiliate
 *  - ZenPlus:    Programa en zenplus.jp/affiliates
 *
 * Las URLs marcadas con '#TODO' son placeholders — reemplázalas con tus
 * propios enlaces de afiliado antes de publicar.
 *
 * Las imágenes (image: '') usan el icono de fallback — reemplázalas con
 * las URLs de imagen reales de cada producto.
 */

export const STORE_META = {
  amazon:     { name: 'Amazon',     icon: '🛒' },
  aliexpress: { name: 'AliExpress', icon: '🛍️' },
  cdJapan:    { name: 'CDJapan',    icon: '🇯🇵' },
  playAsia:   { name: 'Play-Asia',  icon: '🎮' },
  zenPlus:    { name: 'ZenPlus',    icon: '⛩️' },
};

export const CATALOG = [
  // ── Merchandising ─────────────────────────────────────────────────────────
  {
    id: 'naruto-figure-sage',
    category: 'merchandising',
    title: 'Figura Naruto Uzumaki — Modo Sabio',
    description: 'Figura PVC de colección, 25 cm. Alta calidad de detalle.',
    image: '', // reemplaza con URL de imagen
    badge: 'Popular',
    featured: true,
    stores: [
      { store: 'amazon',     price: 29.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 18.50, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'playAsia',   price: 34.99, currency: '€', url: '#TODO-playasia', inStock: false },
    ],
  },
  {
    id: 'levi-figure-aot',
    category: 'merchandising',
    title: 'Figura Levi Ackerman — Attack on Titan',
    description: 'Figura articulada 20 cm, uniforme Survey Corps.',
    image: '',
    badge: null,
    featured: false,
    stores: [
      { store: 'amazon',     price: 24.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 14.90, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'cdJapan',    price: 31.00, currency: '€', url: '#TODO-cdjapan', inStock: true  },
    ],
  },
  {
    id: 'goku-funko-pop',
    category: 'merchandising',
    title: 'Funko Pop — Goku Super Saiyan (Dragon Ball Z)',
    description: 'Edición con base y caja coleccionista oficial.',
    image: '',
    badge: 'Oferta',
    featured: false,
    stores: [
      { store: 'amazon',     price: 14.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 9.80,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'playAsia',   price: 16.50, currency: '€', url: '#TODO-playasia', inStock: true  },
    ],
  },
  {
    id: 'demon-slayer-poster-set',
    category: 'merchandising',
    title: 'Set 4 Pósters Demon Slayer — A3 Laminados',
    description: 'Tanjiro, Nezuko, Zenitsu e Inosuke. Papel satinado 200g.',
    image: '',
    badge: null,
    featured: false,
    stores: [
      { store: 'amazon',     price: 12.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 6.50,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'zenPlus',    price: 15.00, currency: '€', url: '#TODO-zenplus', inStock: true  },
    ],
  },

  // ── Alimentación ──────────────────────────────────────────────────────────
  {
    id: 'buldak-pack5',
    category: 'alimentacion',
    title: 'Buldak Spicy Chicken Ramen — Pack 5 uds.',
    description: 'El ramen más picante de Corea. Nivel: extremo.',
    image: '',
    badge: 'Viral',
    featured: true,
    stores: [
      { store: 'amazon',     price: 9.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 7.20,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'zenPlus',    price: 11.50, currency: '€', url: '#TODO-zenplus', inStock: true  },
    ],
  },
  {
    id: 'pocky-pack10',
    category: 'alimentacion',
    title: 'Pocky Chocolate — Pack 10 cajas Glico',
    description: 'Galletas bañadas en chocolate, importadas del Japón.',
    image: '',
    badge: null,
    featured: false,
    stores: [
      { store: 'amazon',     price: 14.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 10.50, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'zenPlus',    price: 16.80, currency: '€', url: '#TODO-zenplus', inStock: true  },
    ],
  },
  {
    id: 'kitkat-matcha',
    category: 'alimentacion',
    title: 'Kit Kat Matcha — 12 barras Nestlé Japan',
    description: 'Edición japonesa de té verde. Importación directa.',
    image: '',
    badge: 'Exclusivo',
    featured: false,
    stores: [
      { store: 'amazon',     price: 11.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 8.90,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'zenPlus',    price: 13.50, currency: '€', url: '#TODO-zenplus', inStock: false },
    ],
  },
  {
    id: 'onigiri-seasoning',
    category: 'alimentacion',
    title: 'Set Condimentos Onigiri — 6 sabores',
    description: 'Furikake variado para arroz. Edición especial japonesa.',
    image: '',
    badge: null,
    featured: false,
    stores: [
      { store: 'amazon',     price: 16.50, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 12.00, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'zenPlus',    price: 18.00, currency: '€', url: '#TODO-zenplus', inStock: true  },
    ],
  },

  // ── Ropa ──────────────────────────────────────────────────────────────────
  {
    id: 'naruto-tshirt-konoha',
    category: 'ropa',
    title: 'Camiseta Naruto — Símbolo Konoha',
    description: 'Algodón 100%, corte regular. Tallas S–XXL.',
    image: '',
    badge: null,
    featured: true,
    stores: [
      { store: 'amazon',     price: 19.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 11.50, currency: '€', url: '#TODO-aliexpress', inStock: true  },
    ],
  },
  {
    id: 'aot-hoodie-survey',
    category: 'ropa',
    title: 'Sudadera Attack on Titan — Survey Corps',
    description: 'Hoodie unisex con bordado de las alas de la libertad.',
    image: '',
    badge: 'Popular',
    featured: false,
    stores: [
      { store: 'amazon',     price: 34.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 22.00, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'playAsia',   price: 39.00, currency: '€', url: '#TODO-playasia', inStock: true  },
    ],
  },
  {
    id: 'dbz-capsule-tshirt',
    category: 'ropa',
    title: 'Camiseta Capsule Corp — Dragon Ball Z',
    description: 'Diseño oficial, estampado en serigrafia.',
    image: '',
    badge: null,
    featured: false,
    stores: [
      { store: 'amazon',     price: 21.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 13.50, currency: '€', url: '#TODO-aliexpress', inStock: true  },
    ],
  },
  {
    id: 'yukata-azul',
    category: 'ropa',
    title: 'Yukata Algodón — Estampado Índigo',
    description: 'Kimono informal de verano, talla única ajustable.',
    image: '',
    badge: 'Auténtico',
    featured: false,
    stores: [
      { store: 'amazon',     price: 45.00, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 28.00, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'zenPlus',    price: 52.00, currency: '€', url: '#TODO-zenplus', inStock: true  },
    ],
  },

  // ── Literatura ─────────────────────────────────────────────────────────────
  {
    id: 'one-piece-vol1',
    category: 'literatura',
    title: 'Manga One Piece — Vol. 1 (Ed. Española)',
    description: 'El inicio de la aventura de Luffy. Editorial Planeta Cómic.',
    image: '',
    badge: null,
    featured: true,
    stores: [
      { store: 'amazon',  price: 8.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdJapan', price: 6.50,  currency: '€', url: '#TODO-cdjapan', inStock: true  },
    ],
  },
  {
    id: 'demon-slayer-vol1',
    category: 'literatura',
    title: 'Manga Demon Slayer — Vol. 1 (Ed. Española)',
    description: 'Kimetsu no Yaiba. La historia de Tanjiro comienza aquí.',
    image: '',
    badge: 'Bestseller',
    featured: false,
    stores: [
      { store: 'amazon',  price: 9.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdJapan', price: 7.20,  currency: '€', url: '#TODO-cdjapan', inStock: true  },
    ],
  },
  {
    id: 'mha-vol1',
    category: 'literatura',
    title: 'Manga My Hero Academia — Vol. 1',
    description: 'Boku no Hero Academia. ¡El inicio del héroe más poderoso!',
    image: '',
    badge: null,
    featured: false,
    stores: [
      { store: 'amazon',  price: 8.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdJapan', price: 6.80,  currency: '€', url: '#TODO-cdjapan', inStock: true  },
    ],
  },
  {
    id: 'death-note-boxset',
    category: 'literatura',
    title: 'Box Set Death Note — Edición Completa',
    description: 'Los 13 tomos + guía oficial. Caja coleccionista.',
    image: '',
    badge: 'Colección',
    featured: false,
    stores: [
      { store: 'amazon',  price: 99.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdJapan', price: 82.00, currency: '€', url: '#TODO-cdjapan', inStock: true  },
    ],
  },
];

/** Returns all products for a given category */
export function getByCategory(categoryId) {
  return CATALOG.filter((p) => p.category === categoryId);
}

/** Returns a single product by id */
export function getById(id) {
  return CATALOG.find((p) => p.id === id) || null;
}

/** Returns featured products (one per category) */
export function getFeatured() {
  return CATALOG.filter((p) => p.featured);
}

/** Filter catalog by search query (title match) */
export function searchCatalog(query) {
  const q = query.toLowerCase().trim();
  if (!q) return CATALOG;
  return CATALOG.filter((p) => p.title.toLowerCase().includes(q));
}

/** Returns the cheapest in-stock price across all stores for a product */
export function getCheapestPrice(product) {
  const inStock = product.stores.filter((s) => s.inStock);
  if (!inStock.length) return null;
  return inStock.reduce((min, s) => (s.price < min.price ? s : min));
}
