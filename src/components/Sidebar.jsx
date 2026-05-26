import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import yuhuLogo from '/dist/assets/Yuhi logo web-C5O6J2IR.png';

const NAV_ITEMS = [
  { path: '/',           label: 'Inicio',     icon: '🏠' },
  { path: '/categorias', label: 'Categorías', icon: '📦' },
  { path: '/ofertas',    label: 'Ofertas',    icon: '🏷️' },
  { path: '/carrito',    label: 'Carrito',    icon: '🛒' },
  { path: '/contacto',   label: 'Contacto',   icon: '💬' },
  { path: '/login',      label: 'Cuenta',     icon: '👤' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <aside
      className="hidden lg:flex flex-col sticky top-0 h-screen shrink-0 w-56 z-50"
      style={{ background: 'linear-gradient(180deg,#274156 0%,#1C6E8C 100%)' }}
    >
      {/* Logo */}
      <div className="px-6 pt-8 pb-5">
        <Link
          to="/"
          className="flex items-center justify-center rounded-2xl px-5 py-2.5 w-full"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <img src={yuhuLogo} alt="Yuhi Logo" className="h-10 w-auto" />
        </Link>
        <p className="text-center text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Cultura asiática &amp; Otaku
        </p>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-3" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const active =
            pathname === path || (path !== '/' && pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
              style={
                active
                  ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                  : { color: 'rgba(255,255,255,0.6)' }
              }
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
              {path === '/carrito' && cartCount > 0 && (
                <span className="ml-auto inline-flex items-center justify-center rounded-full px-2 py-1 text-[10px] font-bold" style={{ background: '#FFA1C7', color: '#1C2734' }}>
                  {cartCount}
                </span>
              )}
              {active && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.8)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-green-400 block" />
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>En línea</span>
        </div>
        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>© 2026 YuHi</p>
      </div>
    </aside>
  );
}
