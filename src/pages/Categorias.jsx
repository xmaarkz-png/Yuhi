import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { getByCategory, getCheapestPrice, STORE_META } from "../data/catalog";
import { compareAllSources, getMockResults } from "../services/api";

const CATEGORIES = [
  { id: "merchandising", label: "Merchandising", emoji: "🎬", color: "#9f1239", searchQuery: "anime figures manga" },
  { id: "alimentacion",  label: "Alimentación",  emoji: "🍜", color: "#b45309", searchQuery: "japanese ramen anime snacks" },
  { id: "ropa",          label: "Ropa",          emoji: "👕", color: "#0369a1", searchQuery: "anime t-shirt manga hoodie" },
  { id: "literatura",    label: "Literatura",    emoji: "📚", color: "#6f46c1", searchQuery: "manga books japanese comic" },
];

export default function Categorias() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activecat, setActivecat] = useState(searchParams.get("cat") || "merchandising");
  const [loading, setLoading] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);

  const catalogProducts = getByCategory(activecat);
  const activeCat = CATEGORIES.find((c) => c.id === activecat);

  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.id === activecat);
    if (!cat) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const results = await compareAllSources(cat.searchQuery);
        setApiProducts(results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
        setApiProducts(getMockResults(cat.searchQuery).slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activecat]);

  // Merge: catalog products first, then API results
  const allProducts = [
    ...catalogProducts,
    ...apiProducts.filter(
      (api) =>
        !catalogProducts.some(
          (cat) => cat.title.toLowerCase() === api.title.toLowerCase()
        )
    ),
  ];

  return (
    <div className="pb-20 min-h-screen lg:pb-12" style={{ background: "#FBFCFF" }}>
      <Header />

      {/* Category header with gradient */}
      <div
        className="px-4 pt-6 pb-8"
        style={{
          background: `linear-gradient(135deg, ${activeCat?.color}40 0%, ${activeCat?.color}20 100%)`,
          borderBottom: `3px solid ${activeCat?.color}`
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{activeCat?.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#274156" }}>
              {activeCat?.label}
            </h1>
            <p className="text-sm" style={{ color: "#1C6E8C" }}>
              {catalogProducts.length} recomendados
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActivecat(cat.id)}
              className="whitespace-nowrap text-sm font-bold px-5 py-2.5 rounded-full transition-all"
              style={
                activecat === cat.id
                  ? { background: cat.color, color: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }
                  : { background: "#fff", color: "#274156", border: `2px solid ${cat.color}40` }
              }
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-6 pb-4 lg:px-10 flex flex-col gap-6">
        {/* Catalog products section */}
        {catalogProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#274156" }}>
              💝 Recomendados
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {catalogProducts.map((product) => {
                const cheapest = getCheapestPrice(product);
                const featuredCard = cheapest
                  ? {
                      ...product,
                      price: cheapest.price,
                      currency: cheapest.currency,
                      url: cheapest.url,
                      inStock: cheapest.inStock,
                      source: STORE_META[cheapest.store]?.name || cheapest.store,
                      sourceIcon: STORE_META[cheapest.store]?.icon || '🛍️',
                      store: cheapest.store,
                    }
                  : null;

                return featuredCard ? (
                  <ProductCard key={`${product.id}-${cheapest.store}`} product={featuredCard} highlight={true} />
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* API products section */}
        {apiProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#274156" }}>
              {loading ? "🔄 Actualizando..." : "📱 Más opciones"}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {apiProducts.map((product) => (
                <a
                  key={`${product.source}-${product.id}`}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg active:scale-95 transition-all flex flex-col"
                  style={{ border: "2px solid #D0CCD0", textDecoration: "none" }}
                >
                  <div className="w-full h-36 shrink-0" style={{ background: "#f0f0f0" }}>
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">{product.sourceIcon}</div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "#1C6E8C" }}>
                        {product.sourceIcon} {product.source}
                      </p>
                      <p className="text-sm font-black line-clamp-2" style={{ color: "#274156", letterSpacing: '0.01em' }}>
                        {product.title}
                      </p>
                    </div>
                    <p className="text-lg font-black mt-2" style={{ color: activeCat?.color }}>
                      {product.currency}{product.price?.toFixed(2) || "—"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {!loading && catalogProducts.length === 0 && apiProducts.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3 text-center">
            <span className="text-6xl">🔍</span>
            <p className="font-bold text-lg" style={{ color: "#274156" }}>Cargando productos...</p>
          </div>
        )}
      </div>
    </div>
  );
}
