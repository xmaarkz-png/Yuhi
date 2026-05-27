/**
 * Catálogo curado de productos populares de cultura asiática/otaku.
 *
 * TIENDAS CON PROGRAMAS DE AFILIADOS PÚBLICOS:
 *  - Amazon:     Programa Associates — genera enlaces en tu dashboard
 *  - AliExpress: Programa Portals — crea enlaces desde portals.aliexpress.com
 *  - CDJapan:    Programa en cdJapan.co.jp/affiliate (en proceso)
 *  - eBay:       Programa Partners — https://partner.ebay.com
 *  - Rakuten:    Affiliate program — https://www.rakuten.com/partners/
 *  - J-List:     Affiliate program — https://www.j-list.com/affiliate/ (anime/Asian products)
 *
 * Las URLs marcadas con '#TODO' son placeholders — reemplázalas con tus
 * propios enlaces de afiliado antes de publicar.
 *
 * Las imágenes (image: '') usan el icono de fallback — reemplázalas con
 * las URLs de imagen reales de cada producto.
 */

export const STORE_META = {
  amazon:     { name: 'Amazon',     icon: '' },
  aliexpress: { name: 'AliExpress', icon: '' },
  cdjapan:    { name: 'CDJapan',    icon: '' },
  ebay:       { name: 'eBay',       icon: '' },
  rakuten:    { name: 'Rakuten',    icon: '' },
  jlist:      { name: 'J-List',     icon: '' },
  elimapi:    { name: 'Taobao',     icon: '' },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 29.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 18.50, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'cdjapan',    price: 32.00, currency: '€', url: '#TODO-cdjapan', inStock: true  },
      { store: 'ebay',       price: 25.99, currency: '€', url: '#TODO-ebay', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 24.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 14.90, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'cdjapan',    price: 28.00, currency: '€', url: '#TODO-cdjapan', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 14.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 9.80,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'ebay',       price: 16.50, currency: '€', url: '#TODO-ebay', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 12.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 6.50,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'ebay',       price: 11.00, currency: '€', url: '#TODO-ebay', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 9.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 7.20,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'rakuten',    price: 10.50, currency: '€', url: '#TODO-rakuten', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 14.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 10.50, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'cdjapan',    price: 16.00, currency: '€', url: '#TODO-cdjapan', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 11.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 8.90,  currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'rakuten',    price: 13.50, currency: '€', url: '#TODO-rakuten', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 16.50, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 12.00, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'cdjapan',    price: 18.00, currency: '€', url: '#TODO-cdjapan', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 19.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 11.50, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'ebay',       price: 18.00, currency: '€', url: '#TODO-ebay', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 34.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 22.00, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'ebay',       price: 32.00, currency: '€', url: '#TODO-ebay', inStock: true  },
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
      image: '',
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
      image: '',
    stores: [
      { store: 'amazon',     price: 45.00, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'aliexpress', price: 28.00, currency: '€', url: '#TODO-aliexpress', inStock: true  },
      { store: 'rakuten',    price: 50.00, currency: '€', url: '#TODO-rakuten', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 8.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdjapan',    price: 6.50,  currency: '€', url: '#TODO-cdjapan', inStock: true  },
      { store: 'jlist',      price: 7.99,  currency: '€', url: '#TODO-jlist', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 9.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdjapan',    price: 7.20,  currency: '€', url: '#TODO-cdjapan', inStock: true  },
      { store: 'jlist',      price: 8.99,  currency: '€', url: '#TODO-jlist', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 8.99,  currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdjapan',    price: 6.80,  currency: '€', url: '#TODO-cdjapan', inStock: true  },
      { store: 'jlist',      price: 7.99,  currency: '€', url: '#TODO-jlist', inStock: true  },
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
      image: '',
    stores: [
      { store: 'amazon',     price: 99.99, currency: '€', url: '#TODO-amazon', inStock: true  },
      { store: 'cdjapan',    price: 82.00, currency: '€', url: '#TODO-cdjapan', inStock: true  },
      { store: 'jlist',      price: 89.99, currency: '€', url: '#TODO-jlist', inStock: true  },
    ],
  },
];

/** Returns all products for a given category */
export function getByCategory(categoryId) {
  return CATALOG.filter((p) => p.category === categoryId);
}

/** Returns the cheapest store option for a product */
export function getCheapestPrice(product) {
  if (!product.stores || product.stores.length === 0) return null;
  return product.stores.reduce((min, store) =>
    store.price < min.price ? store : min
  );
}

/** Returns featured products (one per category) */
export function getFeatured() {
  const categories = ['merchandising', 'alimentacion', 'ropa', 'literatura'];
  return categories
    .map((cat) => CATALOG.find((p) => p.category === cat && p.featured))
    .filter(Boolean);
}

/** Search products by title */
export function searchCatalog(query) {
  const q = query.toLowerCase();
  return CATALOG.filter((p) =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

/** Returns a single product by id */
export function getById(id) {
  return CATALOG.find((p) => p.id === id) || null;
}
