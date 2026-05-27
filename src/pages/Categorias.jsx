import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getByCategory, getCheapestPrice, STORE_META, CATALOG } from "../data/catalog";
import { searchProducts } from "../services/api";

const CATEGORIES = [
  {
    id: "merchandising",
    label: "Merchandising",
    emoji: "",
    color: "#9f1239",
    searchQuery: "anime figure",
    synonyms: ["anime figure", "anime figurine", "anime collectible", "figure pvc", "anime statue"],
  },
  {
    id: "alimentacion",
    label: "Alimentación",
    emoji: "",
    color: "#b45309",
    searchQuery: "japanese snack",
    synonyms: ["japanese snack", "japanese candy", "japanese chips", "japanese snacks pack", "japanese treats"],
  },
  {
    id: "ropa",
    label: "Ropa",
    emoji: "",
    color: "#0369a1",
    searchQuery: "anime hoodie",
    synonyms: ["anime hoodie", "anime sweatshirt", "manga hoodie", "anime jacket", "anime pullover"],
  },
  {
    id: "literatura",
    label: "Literatura",
    emoji: "",
    color: "#6f46c1",
    searchQuery: "manga book",
    synonyms: ["manga book", "manga volume", "manga tomo", "manga volume set", "manga paperback"],
  },
];

export default function Categorias() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activecat, setActivecat] = useState(searchParams.get("cat") || "merchandising");
  const [loading, setLoading] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);

  const catalogProducts = getByCategory(activecat);
  const activeCat = CATEGORIES.find((c) => c.id === activecat);
  const [mergedProducts, setMergedProducts] = useState([]);

  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.id === activecat);
    if (!cat) return;

    const fetchProducts = async () => {
      setLoading(true);
      setApiProducts([]); // Limpiamos resultados anteriores al empezar
      try {
        // Primary search (adds results to cache)
        const results = await searchProducts(cat.searchQuery, 20);
        console.log(`[SerpApi] Resultados para ${cat.label}:`, results);

        // Build deduped list of up to 9 API products using primary query first
        const merged = [];
        const seenTitles = new Set();
        const pushIfUnique = (item) => {
          if (merged.length >= 9) return;
          const t = (item.title || '').toLowerCase();
          const id = item.id || t;
          if (!seenTitles.has(t) && !seenTitles.has(id)) {
            merged.push(item);
            seenTitles.add(t);
            seenTitles.add(id);
          }
        };

        for (const a of results) {
          pushIfUnique(a);
        }

        // If we still have less than 9, run additional searches using synonyms
        if (merged.length < 9 && Array.isArray(cat.synonyms)) {
          for (const term of cat.synonyms) {
            if (merged.length >= 9) break;
            if (!term || term === cat.searchQuery) continue;
            try {
              const extra = await searchProducts(term, 20);
              console.log(`[SerpApi] Resultados adicionales para "${term}":`, extra?.length || 0);
              for (const e of extra) {
                pushIfUnique(e);
                if (merged.length >= 9) break;
              }
            } catch (err) {
              console.warn('Error buscando sinónimo', term, err);
            }
          }
        }

        setApiProducts(merged.slice(0, 9));
        setMergedProducts(merged);
      } catch (error) {
        console.error("Error fetching products:", error);
        setApiProducts([]);
        setCatalogBacked([]);
        setMergedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activecat]);

  // We intentionally do not merge catalog items here to prefer live API data
  const allProducts = apiProducts;

  return (
    <div className="min-h-screen" style={{ background: "#FBFCFF" }}>
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
          {/* Catalog-backed + API products (up to 9) */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#274156" }}>
              Productos
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-slate-100 h-64 rounded-3xl border border-slate-200 animate-pulse" />
                ))
              ) : mergedProducts.length > 0 ? (
                mergedProducts.map((product) => (
                  <ProductCard key={`${product.id}-${product.store || 'srv'}`} product={product} highlight={false} />
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No se encontraron productos con información desde la API.</p>
              )}
            </div>
          </div>

        {/* Import section removed — mergedProducts displays catalog + API results */}

        {!loading && mergedProducts.length === 0 && (
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
