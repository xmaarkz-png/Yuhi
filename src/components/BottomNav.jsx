import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import yuhuLogo from '../assets/Yuhi logo web.png';

const NAV_ITEMS = [
  { path: '/', label: 'Inicio', icon: '🏠' },
  { path: '/categorias', label: 'Categorías', icon: '📦' },
  { path: '/ofertas', label: 'Ofertas', icon: '🏷️' },
  { path: '/carrito', label: 'Carrito', icon: '🛒' },
  { path: '/contacto', label: 'Contacto', icon: '💬' },
  { path: '/login', label: 'Login', icon: '👤' },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 lg:hidden"
      style={{ 
        background: '#FBFCFF', 
        borderTop: '3px solid #FFA1C7',
        boxShadow: '0 -8px 32px rgba(255, 161, 199, 0.15)'
      }}
    >
      {/* Logo header for mobile */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={yuhuLogo} alt="Yuhi Logo" className="h-6 w-auto" />
        </Link>
        <span className="text-[10px]" style={{ color: 'rgba(39, 65, 86, 0.4)' }}>Cultura asiática & Otaku</span>
      </div>

      <div className="flex items-center justify-around h-20 overflow-x-auto">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const active = pathname === path || (path !== '/' && pathname.startsWith(path));
          const isCart = path === '/carrito';
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-1 flex-1 py-2 transition-all hover:scale-110 active:scale-95 relative min-w-fit"
            >
              <span className={`text-3xl transition-transform ${active ? 'scale-125' : ''}`}>
                {icon}
              </span>
              {isCart && cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: '#FFA1C7' }}
                >
                  {cartCount}
                </span>
              )}
              <span
                className="text-xs font-bold text-center px-1"
                style={{ color: active ? '#FFA1C7' : '#D0CCD0' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}



