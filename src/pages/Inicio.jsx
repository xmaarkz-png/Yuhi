import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getFeatured, getCheapestPrice } from "../data/catalog";

const CATEGORIES = [
  {
    id: "merchandising",
    label: "Merchandising",
    img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300",
    gradient: "from-purple-400 to-pink-400",
    emoji: "🎬"
  },
  {
    id: "alimentacion",
    label: "Alimentación",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
    gradient: "from-orange-400 to-red-400",
    emoji: "🍜"
  },
  {
    id: "ropa",
    label: "Ropa",
    img: "https://images.unsplash.com/photo-1564144006388-615f4deb6f57?w=300",
    gradient: "from-blue-400 to-cyan-400",
    emoji: "👕"
  },
  {
    id: "literatura",
    label: "Literatura",
    img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300",
    gradient: "from-indigo-400 to-purple-400",
    emoji: "📚"
  },
];

export default function Inicio() {
  const navigate = useNavigate();
  const featured = getFeatured();

  return (
    <div className="pb-20 min-h-screen" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-8 pb-6">
        {/* Category grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-black mb-5" style={{ color: "#274156" }}>
            📂 Categorías
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/categorias?cat=${cat.id}`)}
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl active:scale-95 transition-all relative group"
                style={{ aspectRatio: "1 / 1.1" }}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors"
                >
                  <span className="text-5xl mb-2">{cat.emoji}</span>
                  <span className="text-white font-bold text-lg drop-shadow-lg">
                    {cat.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured products */}
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#274156" }}>
            ⭐ Destacados
          </h2>

          <div className="flex flex-col gap-4">
            {featured.map((product) => {
              const cheapest = getCheapestPrice(product);
              return (
                <button
                  key={product.id}
                  onClick={() => navigate(`/ofertas?product=${product.id}`)}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all active:scale-95 text-left"
                  style={{ border: "2px solid #FFA1C7" }}
                >
                  <div className="flex gap-4 p-4">
                    {/* Thumb */}
                    <div 
                      className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden"
                      style={{ background: "#f0f0f0" }}
                    >
                      {product.image ? (
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start gap-2 mb-1">
                          {product.badge && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "#FFA1C7" }}>
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-lg font-black leading-snug line-clamp-2" style={{ color: "#274156", letterSpacing: '0.015em' }}>
                          {product.title}
                        </p>
                        <p className="text-base mt-2 font-black" style={{ color: "#1C6E8C" }}>
                          {cheapest ? `${cheapest.currency}${cheapest.price.toFixed(2)}` : "—"}
                        </p>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {product.stores.map((s) => (
                          <span key={s.store} className="text-lg">
                            {['amazon', 'aliexpress', 'cdjapan', 'ebay', 'rakuten', 'jlist'].includes(s.store) ? 
                              (['amazon', 'aliexpress', 'cdjapan', 'ebay', 'rakuten', 'jlist'].indexOf(s.store) === 0 ? '🛒' :
                               ['amazon', 'aliexpress', 'cdjapan', 'ebay', 'rakuten', 'jlist'].indexOf(s.store) === 1 ? '🛍️' :
                               ['amazon', 'aliexpress', 'cdjapan', 'ebay', 'rakuten', 'jlist'].indexOf(s.store) === 2 ? '🇯🇵' :
                               ['amazon', 'aliexpress', 'cdjapan', 'ebay', 'rakuten', 'jlist'].indexOf(s.store) === 3 ? '📦' :
                               ['amazon', 'aliexpress', 'cdjapan', 'ebay', 'rakuten', 'jlist'].indexOf(s.store) === 4 ? '🏪' : '🎌') : '💼'
                            }
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
