import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getCheapestPrice, STORE_META, CATALOG } from "../data/catalog";
import { fetchPricesForProduct, getCachedProductsByQuery, getAllCachedProducts } from "../services/api";
import merchImg from "../assets/merch.webp";
import ropaImg from "../assets/ropajapo.jpg";

const CATEGORIES = [
  {
    id: "merchandising",
    label: "Merchandising",
    img: merchImg,
    gradient: "from-purple-400 to-pink-400",
  },
  {
    id: "alimentacion",
    label: "Alimentación",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
    gradient: "from-orange-400 to-red-400",
  },
  {
    id: "ropa",
    label: "Ropa",
    img: ropaImg,
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    id: "literatura",
    label: "Literatura",
    img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300",
    gradient: "from-indigo-400 to-purple-400",
  },
];

export default function Inicio() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveLoading, setLiveLoading] = useState(false);

  // Load featured products from the local product cache only (no live API calls)
  useEffect(() => {
    // Select up to 6 products from the app cache (categories/offers must have populated it)
    let mounted = true;
    const loadFromCache = () => {
      setLoading(true);
      try {
        const pool = getAllCachedProducts();
        if (!pool || pool.length === 0) {
          if (mounted) setFeatured([]);
          return;
        }
        // shuffle pool in-place copy
        const copy = pool.slice();
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        const picked = copy.slice(0, 6).map((p) => ({
          id: p.id || `${p.title}-${Math.random().toString(36).slice(2,8)}`,
          title: p.title,
          description: p.description || '',
          image: p.image || p.thumbnail || '',
          price: typeof p.price === 'number' ? p.price : (p.prices && p.prices[0] && p.prices[0].price) || null,
          currency: p.currency || '€',
          url: p.url || p.link || '#',
          inStock: typeof p.inStock === 'boolean' ? p.inStock : true,
          source: p.source || p.store || null,
          sourceIcon: p.sourceIcon || '',
          store: p.store || null,
        }));
        if (mounted) setFeatured(picked);
      } catch (e) {
        console.error('Error selecting featured from cache', e);
        if (mounted) setFeatured([]);
      } finally {
        setLoading(false);
      }
    };

    loadFromCache();
    return () => { mounted = false; };
  }, []);

  // Optional: manual live refresh that will call APIs (consumes tokens)
  const refreshLiveFeatured = async () => {
    setLiveLoading(true);
    try {
      const base = getFeatured();
      const promises = base.map(async (product) => {
        try {
          const prices = await fetchPricesForProduct(product.title);
          if (prices && prices.length > 0) {
            const cheapest = prices[0];
            return {
              ...product,
              price: cheapest.price,
              currency: cheapest.currency || '€',
              url: cheapest.url,
              inStock: typeof cheapest.inStock === 'boolean' ? cheapest.inStock : true,
              source: STORE_META[cheapest.store]?.name || cheapest.store,
              sourceIcon: STORE_META[cheapest.store]?.icon || '',
              store: cheapest.store,
              image: product.image || cheapest.image || '',
            };
          }
        } catch (e) {
          console.error('Error loading prices for', product.title, e);
        }
        return null;
      });

      const results = await Promise.all(promises);
      const filtered = results.filter(Boolean).slice(0, 6);
      setFeatured(filtered);
    } catch (e) {
      console.error('Live refresh error', e);
    } finally {
      setLiveLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-8 pb-6 mx-auto lg:px-10">
        {/* Category grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-black mb-5 uppercase tracking-tight" style={{ color: "#274156" }}>
            Categorías
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/categorias?cat=${cat.id}`)}
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl active:scale-95 transition-all relative group"
                style={{ aspectRatio: "1 / 0.85" }}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                  <span className="text-white font-bold text-lg uppercase tracking-widest border-b-2 border-white/50 pb-1">
                    {cat.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured products */}
        <div className="mt-12 lg:mt-16">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-tight" style={{ color: "#274156" }}>
            Destacados
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {loading ? (
              [1,2,3,4,5,6].map((n) => (
                <div key={n} className="bg-slate-100 h-64 rounded-3xl border border-slate-200 animate-pulse" />
              ))
            ) : featured.length > 0 ? (
              featured.map((product) => (
                <ProductCard key={`${product.id}-${product.store || 'srv'}`} product={product} highlight={true} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-sm text-[#475569] mb-3">No hay productos cargados en caché todavía.</p>
                <p className="text-sm text-[#274156]">Visita <a href="/categorias" className="underline">Categorías</a> u <a href="/ofertas" className="underline">Ofertas</a> para cargar productos desde la API (una sola vez).</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
