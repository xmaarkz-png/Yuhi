import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, highlight = false }) {
  const { title, price, originalPrice, image, url, currency, inStock, badge, source, sourceIcon, store } = product;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const discount =
    price && originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      currency: product.currency,
      image: product.image,
      source: product.source,
      sourceIcon: product.sourceIcon,
      store: product.store || product.source,
      url: product.url,
    });
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    const success = toggleWishlist(product);
    if (!success) navigate('/login');
  };

  const isFavorite = isInWishlist(product.id, product.store || product.source);

  return (
    <div
      className="bg-white rounded-[28px] overflow-hidden shadow-sm"
      style={{ border: `1px solid ${highlight ? "rgba(255,161,199,0.45)" : "rgba(39,65,86,0.08)"}` }}
    >
      <div className="relative w-full h-48 overflow-hidden" style={{ background: "#F5F7FA" }}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs uppercase font-bold">Sin imagen</div>
        )}
        <button 
          onClick={handleFavorite}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-90"
          style={{ background: isFavorite ? "#FFA1C7" : "rgba(255,255,255,0.9)" }}
        >
          <svg 
            className={`w-4 h-4 ${isFavorite ? "fill-white" : "fill-[#274156]"}`} 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        {badge && (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: "#FFE4EE", color: "#D61F69" }}>
            {badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-12 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">Sin stock</span>
          </div>
        )}
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            {source && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#1C6E8C" }}>
                {sourceIcon} {source}
              </span>
            )}
            <p className="mt-2 text-sm font-semibold leading-snug line-clamp-2" style={{ color: "#274156" }}>{title}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            {price !== null ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-base" style={{ color: "#1C6E8C" }}>
                  {currency}{price.toFixed(2)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-xs line-through" style={{ color: "#A0AEC0" }}>
                    {currency}{originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm" style={{ color: "#A0AEC0" }}>Precio no disponible</span>
            )}
          </div>
          {discount && <span className="text-[10px] px-2 py-1 rounded-full bg-[#E6F8F1] text-[#0F766E]">Mejor oferta</span>}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleAdd}
            disabled={!inStock}
            className={`w-full text-sm font-semibold py-3 rounded-2xl transition ${
              inStock ? "bg-[#FFA1C7] text-white hover:bg-[#ff90af]" : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
            }`}
          >
            {inStock ? "Añadir al carrito" : "Sin stock"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleFavorite}
              className={`text-sm font-semibold py-3 rounded-2xl transition border ${
                isFavorite 
                  ? "bg-[#FFE4EE] text-[#D61F69] border-[#FFA1C7]" 
                  : "bg-white text-[#274156] border-[#F0E6EA] hover:bg-slate-50"
              }`}
            >
              {isFavorite ? "Guardado" : "Favorito"}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-semibold py-3 rounded-2xl text-center ${
                inStock ? "bg-[#274156] text-white hover:bg-[#1f4b61]" : "bg-[#E2E8F0] text-[#94A3B8] pointer-events-none"
              }`}
            >
              {inStock ? "Ir" : "Sin stock"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
