import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Carrito() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="pb-20 min-h-screen flex flex-col" style={{ background: '#EDF2F7' }}>
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center py-16">
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
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen flex flex-col" style={{ background: '#EDF2F7' }}>
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-3xl w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#1E293B' }}>Mi Carrito</h1>
            <p className="text-sm text-[#475569] mt-2">
              Revisa tus productos y ajusta las cantidades antes de finalizar tu compra.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.store}-${item.title}`}
                className="bg-white rounded-[28px] shadow-sm p-4"
                style={{ border: '1px solid rgba(39,65,86,0.08)' }}
              >
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-300 text-[10px] uppercase font-bold text-center px-2">Sin imagen</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-base" style={{ color: '#1E293B' }}>{item.title}</p>
                        <p className="text-xs mt-1 text-[#475569]">
                          {item.sourceIcon} {item.source}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg" style={{ color: '#0F766E' }}>
                          {item.currency}{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-2xl p-1 border border-[#E2E8F0]">
                        <button
                          onClick={() => updateQuantity(item.id, item.store, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm font-bold text-[#1E293B]"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.store, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm font-bold text-[#1E293B]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.store)}
                        className="text-xs font-bold text-red-500 bg-red-50 px-3 py-2 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F0E6EA]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#475569]">Resumen de compra</p>
                <p className="text-2xl font-bold" style={{ color: '#1E293B' }}>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos
                </p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#0F766E' }}>€{getCartTotal().toFixed(2)}</p>
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
      <Footer />
    </div>
  );
}
