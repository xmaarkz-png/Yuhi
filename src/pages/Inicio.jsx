import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getFeatured, getCheapestPrice } from "../data/catalog";

const CATEGORIES = [
  {
    id: "merchandising",
    label: "Merchandising",
    img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300",
  },
  {
    id: "alimentacion",
    label: "Alimentación",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
  },
  {
    id: "ropa",
    label: "Ropa",
    img: "https://images.unsplash.com/photo-1564144006388-615f4deb6f57?w=300",
  },
  {
    id: "literatura",
    label: "Literatura",
    img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300",
  },
];

export default function Inicio() {
  const navigate = useNavigate();
  const featured = getFeatured();

  return (
    <div className="pb-20 min-h-screen lg:pb-12" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-5 lg:max-w-6xl lg:mx-auto lg:px-10 lg:pt-8">
        {/* Category grid */}
        <h2 className="text-sm font-semibold mb-4 lg:text-base" style={{ color: "#274156" }}>
          Categorías
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/categorias?cat=${cat.id}`)}
              className="rounded-2xl overflow-hidden shadow-sm bg-white text-left active:scale-95 transition-transform"
              style={{ border: "1px solid #D0CCD0" }}
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-32 lg:h-44 object-cover"
              />
              <div className="px-3 py-2">
                <span className="text-sm font-medium" style={{ color: "#274156" }}>
                  {cat.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Featured products */}
        <h2 className="text-sm font-semibold mb-4 lg:text-base" style={{ color: "#274156" }}>
          Destacados
        </h2>

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
          {featured.map((product) => {
            const cheapest = getCheapestPrice(product);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl flex overflow-hidden lg:flex-col"
                style={{ border: "1px solid #D0CCD0" }}
              >
                {/* Thumb */}
                <div className="w-24 h-24 shrink-0 lg:w-full lg:h-44" style={{ background: "#f0f0f0" }}>
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 px-3 py-3 flex flex-col justify-between min-w-0">
                  <div>
                    <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: "#274156" }}>
                      {product.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#1C6E8C" }}>
                      <span style={{ color: "#D0CCD0" }}>Desde </span>
                      <strong>{cheapest ? `${cheapest.currency}${cheapest.price.toFixed(2)}` : "—"}</strong>
                      <span className="ml-2" style={{ color: "#D0CCD0" }}>· {product.stores.length} tiendas</span>
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/ofertas?product=${product.id}`)}
                    className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-xl text-white self-start"
                    style={{ background: "#1C6E8C" }}
                  >
                    Comparar →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
