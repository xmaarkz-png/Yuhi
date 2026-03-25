import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getByCategory, getCheapestPrice, STORE_META } from "../data/catalog";

const CATEGORIES = [
  { id: "merchandising", label: "Merchandising" },
  { id: "alimentacion",  label: "Alimentación"  },
  { id: "ropa",          label: "Ropa"           },
  { id: "literatura",    label: "Literatura"     },
];

export default function Categorias() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activecat, setActivecat] = useState(searchParams.get("cat") || "merchandising");

  const products = getByCategory(activecat);

  return (
    <div className="pb-20 min-h-screen lg:pb-12" style={{ background: "#FBFCFF" }}>
      <Header />

      {/* Tab bar */}
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto no-scrollbar lg:max-w-6xl lg:mx-auto lg:px-10 lg:pt-6 lg:gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActivecat(cat.id)}
            className="whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full transition-colors"
            style={
              activecat === cat.id
                ? { background: "#1C6E8C", color: "#fff" }
                : { background: "#D0CCD0", color: "#274156" }
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:max-w-6xl lg:mx-auto lg:px-10 lg:pb-8">
        {products.map((product) => {
          const cheapest = getCheapestPrice(product);
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
              style={{ border: "1px solid #D0CCD0" }}
            >
              {/* Image */}
              <div className="relative w-full h-44" style={{ background: "#f0f0f0" }}>
                {product.image ? (
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
                )}
                {product.badge && (
                  <span
                    className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#FFA1C7", color: "#274156" }}
                  >
                    {product.badge}
                  </span>
                )}
                {/* Store count badge */}
                <span
                  className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(28,110,140,0.9)", color: "#fff" }}
                >
                  {product.stores.length} tiendas
                </span>
              </div>

              {/* Info */}
              <div className="px-4 py-3 flex flex-col gap-2">
                <p className="text-sm font-semibold leading-snug" style={{ color: "#274156" }}>
                  {product.title}
                </p>

                {/* Cheapest price + stores preview */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px]" style={{ color: "#D0CCD0" }}>Desde </span>
                    <span className="font-bold text-base" style={{ color: "#1C6E8C" }}>
                      {cheapest ? `${cheapest.currency}${cheapest.price.toFixed(2)}` : "—"}
                    </span>
                  </div>
                  {/* Store icons row */}
                  <div className="flex gap-1">
                    {product.stores.map((s) => (
                      <span key={s.store} className="text-base" title={STORE_META[s.store]?.name}>
                        {STORE_META[s.store]?.icon}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/ofertas?product=${product.id}`)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#274156" }}
                >
                  Comparar precios
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
