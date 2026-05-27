import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getFeatured, getCheapestPrice, STORE_META, CATALOG } from "../data/catalog";
import { fetchPricesForProduct } from "../services/api";
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

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
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
      let filtered = results.filter(Boolean).slice(0, 6);

      // If we don't have 6 items, try to fill from CATALOG items
      if (filtered.length < 6) {
        const needed = 6 - filtered.length;
        const usedIds = new Set(filtered.map((p) => p.id));
        // iterate catalog items and fetch prices until we have enough
        for (const item of CATALOG) {
          if (filtered.length >= 6) break;
          if (usedIds.has(item.id)) continue;
          try {
            const prices = await fetchPricesForProduct(item.title);
            if (prices && prices.length > 0) {
              const cheapest = prices[0];
              const filled = {
                ...item,
                price: cheapest.price,
                currency: cheapest.currency || '€',
                url: cheapest.url,
                inStock: typeof cheapest.inStock === 'boolean' ? cheapest.inStock : true,
                source: STORE_META[cheapest.store]?.name || cheapest.store,
                sourceIcon: STORE_META[cheapest.store]?.icon || '',
                store: cheapest.store,
                image: item.image || cheapest.image || '',
              };
              filtered.push(filled);
              usedIds.add(item.id);
            }
          } catch (e) {
            console.error('Error filling featured from catalog', item.title, e);
          }
        }
      }

      if (mounted) setFeatured(filtered.slice(0, 6));
      setLoading(false);
    };

    load();
    return () => { mounted = false; };
  }, []);

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
            ) : (
              featured.map((product) => (
                <ProductCard key={`${product.id}-${product.store || 'srv'}`} product={product} highlight={true} />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
