import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getByCategory, getCheapestPrice, STORE_META } from "../data/catalog";
import { searchTaobaoProducts } from "../services/elimApi";

const CATEGORIES = [
  { id: "merchandising", label: "Merchandising", emoji: "", color: "#9f1239", searchQuery: "anime figure" },
  { id: "alimentacion",  label: "Alimentación",  emoji: "", color: "#b45309", searchQuery: "japanese snack" },
  { id: "ropa",          label: "Ropa",          emoji: "", color: "#0369a1", searchQuery: "anime hoodie" },
  { id: "literatura",    label: "Literatura",    emoji: "", color: "#6f46c1", searchQuery: "manga book" },
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
      setApiProducts([]); // Limpiamos resultados anteriores al empezar
      try {
        const results = await searchTaobaoProducts(cat.searchQuery);
        console.log(`[API Elim] Resultados para ${cat.label}:`, results);
        setApiProducts(results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
        setApiProducts([]);
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
              RECOMENDADOS
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
                      sourceIcon: STORE_META[cheapest.store]?.icon || '',
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
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-tight" style={{ color: "#274156" }}>
            {loading ? "Buscando en Taobao..." : "Más opciones (Importación)"}
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-100 h-64 rounded-3xl border border-slate-200" />
              ))}
            </div>
          ) : apiProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {apiProducts.map((product) => (
                <ProductCard
                  key={`${product.source}-${product.id}`}
                  product={product}
                  highlight={false}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No se encontraron productos adicionales en esta categoría.</p>
          )}
        </div>

        {!loading && catalogProducts.length === 0 && apiProducts.length === 0 && (
          <div className="flex flex-col items-center py-24 gap-3 text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1C6E8C] rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-lg" style={{ color: "#274156" }}>Cargando productos...</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
