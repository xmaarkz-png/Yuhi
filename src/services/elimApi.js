const API_KEY = 'c873a0b1df40c3818f917ed3001a3cf007102f5f';
const BASE_URL = 'https://api-gw.elim.asia';

/**
 * Busca productos en Taobao a través de la API de Elim
 * @param {string} keyword - Palabra clave de búsqueda
 * @param {number} page - Número de página
 */
export async function searchTaobaoProducts(keyword = "anime", page = 1) {
  try {
    // Usamos un proxy para evitar el bloqueo de CORS del navegador
    const targetUrl = `${BASE_URL}/taobao/item_search/?key=${API_KEY}&q=${encodeURIComponent(keyword)}&page=${page}&result_type=json`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    console.log("[Elim API] Consultando:", targetUrl);

    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`Error de red: ${response.status}`);

    const data = await response.json();
    console.log("[Elim API] Respuesta recibida:", data);

    // Intentamos extraer los items de varias rutas posibles que usa Elim API
    const items = data?.items?.item || data?.item || [];

    if (Array.isArray(items)) {
      return items.map((item) => ({
        id: item.num_iid || Math.random().toString(36).substr(2, 9),
        title: item.title || "Producto de Taobao",
        description: `Importación directa vía Taobao.`,
        image: item.pic_url 
          ? (item.pic_url.startsWith('//') ? `https:${item.pic_url}` : item.pic_url)
          : 'https://via.placeholder.com/300',
        price: parseFloat(item.price) || 0,
        currency: '¥',
        url: item.detail_url || "#",
        source: 'Taobao',
        sourceIcon: '',
        badge: item.promotion_price ? 'Oferta' : 'Importado',
        store: 'elimapi',
        inStock: true
      }));
    }
    return [];
  } catch (error) {
    console.error("[Elim API] Error crítico:", error);
    return [];
  }
}