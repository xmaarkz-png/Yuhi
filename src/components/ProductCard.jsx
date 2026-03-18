/**
 * ProductCard — renders a single product result with price info
 * and an outbound referral link button.
 */
export default function ProductCard({ product, showSource = true, highlight = false }) {
  const {
    title, price, originalPrice, image, rating, reviews,
    url, currency, inStock, badge, source, sourceIcon,
  } = product;

  const discount =
    price && originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${
        highlight ? 'border-[#FFA1C7] ring-2 ring-[#FFA1C7]/20' : 'border-[#D0CCD0]'
      }`}
    >
      {/* Image */}
      <div className="relative w-full h-44 bg-gray-50 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
        )}
        {badge && (
          <span className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:'#FFA1C7',color:'#274156'}}>
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
            <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">
              Sin stock
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2">
        {showSource && (
          <span className="text-xs text-gray-400 font-medium">
            {sourceIcon} {source}
          </span>
        )}

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Prices */}
        <div className="flex items-baseline gap-2">
          {price !== null ? (
            <>
              <span className="font-bold text-lg" style={{color:'#1C6E8C'}}>
                {currency}{price.toFixed(2)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-gray-400 text-sm line-through">
                  {currency}{originalPrice.toFixed(2)}
                </span>
              )}
            </>
          ) : (
            <span className="text-gray-400 text-sm">Precio no disponible</span>
          )}
        </div>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="text-yellow-400">★</span>
            <span>{rating}</span>
            {reviews > 0 && <span className="text-gray-400">({reviews.toLocaleString()})</span>}
          </div>
        )}

        {/* CTA Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${
            inStock
              ? 'text-white hover:opacity-90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
          }`}
            style={inStock ? {background:'#274156'} : {}}
          onClick={(e) => !inStock && e.preventDefault()}
        >
          {inStock ? 'Ver en tienda →' : 'Sin stock'}
        </a>
      </div>
    </div>
  );
}
