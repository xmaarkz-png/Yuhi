export default function ProductCard({ product, highlight = false }) {
  const { title, price, originalPrice, image, url, currency, inStock, badge, source, sourceIcon } = product;

  const discount =
    price && originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm"
      style={{ border: `1px solid ${highlight ? "#FFA1C7" : "#D0CCD0"}` }}
    >
      <div className="relative w-full h-48 overflow-hidden" style={{ background: "#f9f9f9" }}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
        )}
        {badge && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#FFA1C7", color: "#274156" }}>
            {badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Sin stock</span>
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex flex-col gap-2">
        {source && (
          <span className="text-[11px]" style={{ color: "#1C6E8C" }}>{sourceIcon} {source}</span>
        )}
        <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: "#274156" }}>{title}</p>

        <div className="flex items-baseline gap-2">
          {price !== null ? (
            <>
              <span className="font-bold text-base" style={{ color: "#1C6E8C" }}>{currency}{price.toFixed(2)}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs line-through" style={{ color: "#D0CCD0" }}>{currency}{originalPrice.toFixed(2)}</span>
              )}
            </>
          ) : (
            <span className="text-sm" style={{ color: "#D0CCD0" }}>Precio no disponible</span>
          )}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-opacity ${
            inStock ? "text-white hover:opacity-90" : "pointer-events-none opacity-40"
          }`}
          style={inStock ? { background: "#274156" } : { background: "#D0CCD0" }}
          onClick={(e) => !inStock && e.preventDefault()}
        >
          {inStock ? "Añadir al Carrito" : "Sin stock"}
        </a>
      </div>
    </div>
  );
}
