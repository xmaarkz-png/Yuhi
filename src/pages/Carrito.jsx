import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Carrito() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="pb-20 min-h-screen flex items-center justify-center px-4" style={{ background: '#EDF2F7' }}>
        <div className="max-w-lg w-full text-center py-16">
          <span className="text-6xl mb-6 block">🛒</span>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#1E293B' }}>Tu carrito está vacío</h1>
          <p className="text-sm mb-6" style={{ color: '#475569' }}>
            Añade productos desde las secciones de inicio, categorías u ofertas.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-full font-semibold"
            style={{ background: '#FFA1C7', color: '#FFFFFF' }}
          >
            Volver a comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen px-4" style={{ background: '#EDF2F7' }}>
      <div className="max-w-3xl mx-auto pt-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#1E293B' }}>Mi Carrito</h1>
          <p className="text-sm text-[#475569] mt-2">
            Revisa los productos guardados y ajusta las cantidades antes de pagar.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.store}`}
              className="bg-white rounded-[28px] shadow-sm p-4"
              style={{ border: '1px solid rgba(39,65,86,0.08)' }}
            >
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#F8FAFC] flex items-center justify-center text-3xl">
                  {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : '🛍️'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-base" style={{ color: '#1E293B' }}>{item.title}</p>
                      <p className="text-xs mt-1 text-[#475569]">
                        {item.sourceIcon} {item.source}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-center text-right min-w-[116px]">
                      <p className="font-bold text-lg" style={{ color: '#0F766E' }}>
                        {item.currency}{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-[#64748B]">{item.currency}{item.price.toFixed(2)} cada uno</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-[#FEF3C7] px-3 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.store, item.quantity - 1)}
                        className="w-9 h-9 rounded-full font-bold"
                        style={{ background: '#FFF1F2', color: '#BE185D' }}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, item.store, parseInt(e.target.value, 10) || 1)}
                        className="w-16 text-center rounded-full border border-[#CBD5E1] px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.store, item.quantity + 1)}
                        className="w-9 h-9 rounded-full font-bold"
                        style={{ background: '#FFF1F2', color: '#BE185D' }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.store)}
                      className="text-sm font-semibold"
                      style={{ color: '#E11D48' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm" style={{ border: '1px solid rgba(39,65,86,0.08)' }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#475569]">Resumen de compra</p>
              <p className="text-2xl font-bold" style={{ color: '#1E293B' }}>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos
              </p>
            </div>
            <p className="text-2xl font-bold text-[#0F766E]">€{getCartTotal().toFixed(2)}</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => alert('Función de pago simulada: redirigir a pasarela o checkout.')}
              className="w-full rounded-full py-3 font-semibold"
              style={{ background: '#FFA1C7', color: '#FFFFFF' }}
            >
              Ir a pagar
            </button>
            <button
              onClick={clearCart}
              className="w-full rounded-full py-3 font-semibold"
              style={{ background: '#E2E8F0', color: '#1E293B' }}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
