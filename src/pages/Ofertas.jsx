import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthButton from "../components/AuthButton";
import { getById, searchCatalog, getCheapestPrice, STORE_META } from "../data/catalog";

// ── Comparison view: one product vs multiple stores ────────────────────────
function ComparisonView({ product }) {
  const navigate = useNavigate();

  const sorted = [...product.stores].sort((a, b) => {
    if (!a.inStock) return 1;
    if (!b.inStock) return -1;
    return a.price - b.price;
  });

  const cheapestIdx = sorted.findIndex((s) => s.inStock);

  return (
    <div className="pb-20 min-h-screen lg:pb-12" style={{ background: "#FBFCFF" }}>
      <Header subtitle="Comparador de precios" />

      <div className="px-4 pt-4 lg:max-w-5xl lg:mx-auto lg:px-10 lg:pt-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm mb-4"
          style={{ color: "#1C6E8C" }}
        >
          ← Volver
        </button>

        <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Product card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-5 lg:mb-0 lg:w-72 lg:shrink-0" style={{ border: "1px solid #D0CCD0" }}>
          <div className="relative w-full h-52" style={{ background: "#f0f0f0" }}>
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">🛍️</div>
            )}
            {product.badge && (
              <span
                className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full"
                style={{ background: "#FFA1C7", color: "#274156" }}
              >
                {product.badge}
              </span>
            )}
          </div>
          <div className="px-4 py-4">
            <p className="font-bold text-base leading-snug mb-1" style={{ color: "#274156" }}>
              {product.title}
            </p>
            <p className="text-sm" style={{ color: "#1C6E8C" }}>{product.description}</p>
          </div>
        </div>

        {/* Store comparison list */}
        <div className="lg:flex-1">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1C6E8C" }}>
          Tiendas disponibles
        </p>

        <div className="flex flex-col gap-3">
          {sorted.map((s, i) => {
            const meta = STORE_META[s.store];
            const isCheapest = i === cheapestIdx;

            return (
              <div
                key={s.store}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: isCheapest ? "2px solid #1C6E8C" : "1px solid #D0CCD0",
                  background: "#fff",
                }}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  {/* Store info */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meta?.icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#274156" }}>
                        {meta?.name}
                        {isCheapest && (
                          <span
                            className="ml-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: "#1C6E8C", color: "#fff" }}
                          >
                            MEJOR PRECIO
                          </span>
                        )}
                      </p>
                      {!s.inStock && (
                        <p className="text-[11px]" style={{ color: "#FFA1C7" }}>Sin stock</p>
                      )}
                    </div>
                  </div>

                  {/* Price + button */}
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg" style={{ color: s.inStock ? "#1C6E8C" : "#D0CCD0" }}>
                      {s.currency}{s.price.toFixed(2)}
                    </span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-semibold px-3 py-2 rounded-xl ${!s.inStock ? "pointer-events-none opacity-40" : ""}`}
                      style={
                        isCheapest && s.inStock
                          ? { background: "#1C6E8C", color: "#fff" }
                          : { background: "#274156", color: "#fff" }
                      }
                      onClick={(e) => !s.inStock && e.preventDefault()}
                    >
                      Ir →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>        </div>
        </div>      </div>
    </div>
  );
}

// ── Catalog browse / search ───────────────────────────────────────────────────
function CatalogBrowse() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = searchCatalog(query);

  return (
    <div className="pb-20 min-h-screen lg:pb-12" style={{ background: "#FBFCFF" }}>
      <Header subtitle="Comparador de precios" />

      <div className="px-4 pt-4 lg:max-w-6xl lg:mx-auto lg:px-10 lg:pt-6">
        {/* Search within catalog */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en el catálogo…"
            className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
            style={{ background: "#D0CCD0", color: "#274156" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="px-4 py-3 rounded-2xl text-sm font-semibold"
              style={{ background: "#D0CCD0", color: "#274156" }}
            >
              ✕
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-2 text-center">
            <span className="text-5xl">🔍</span>
            <p className="font-semibold" style={{ color: "#274156" }}>Sin resultados</p>
            <p className="text-sm" style={{ color: "#1C6E8C" }}>Prueba con otro término</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
            {results.map((product) => {
              const cheapest = getCheapestPrice(product);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm"
                  style={{ border: "1px solid #D0CCD0" }}
                >
                  <div className="relative w-full h-40" style={{ background: "#f0f0f0" }}>
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
                    )}
                    {product.badge && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#FFA1C7", color: "#274156" }}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-2">
                    <p className="text-sm font-semibold leading-snug" style={{ color: "#274156" }}>{product.title}</p>
                    <div className="flex items-center justify-between">
                      <span>
                        <span className="text-[10px]" style={{ color: "#D0CCD0" }}>Desde </span>
                        <span className="font-bold" style={{ color: "#1C6E8C" }}>
                          {cheapest ? `${cheapest.currency}${cheapest.price.toFixed(2)}` : "—"}
                        </span>
                      </span>
                      <span className="text-xs" style={{ color: "#D0CCD0" }}>{product.stores.length} tiendas</span>
                    </div>
                    <AuthButton type="button" onClick={() => navigate(`/ofertas?product=${product.id}`)} variant="primary">
                      Comparar precios
                    </AuthButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Ofertas() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");

  if (productId) {
    const product = getById(productId);
    if (!product) {
      return (
        <div className="pb-20 min-h-screen flex flex-col items-center justify-center gap-3" style={{ background: "#FBFCFF" }}>
          <span className="text-5xl">😕</span>
          <p className="font-semibold" style={{ color: "#274156" }}>Producto no encontrado</p>
        </div>
      );
    }
    return <ComparisonView product={product} />;
  }

  return <CatalogBrowse />;
}
