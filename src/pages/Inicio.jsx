import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getFeatured, getCheapestPrice, STORE_META } from "../data/catalog";
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
  const featured = getFeatured();

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
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-tight" style={{ color: "#274156" }}>
            Destacados
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {featured.map((product) => {
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
      </div>
      <Footer />
    </div>
  );
}
