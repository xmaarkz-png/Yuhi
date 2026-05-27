import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import yuhuLogo from '../assets/Yuhi logo web.png';

const NAV_ITEMS = [
  { path: '/',           label: 'Inicio',     icon: '' },
  { path: '/categorias', label: 'Categorías', icon: '' },
  { path: '/ofertas',    label: 'Ofertas',    icon: '' },
  { path: '/comparar',   label: 'Comparador',       icon: '' },
  { path: '/wishlist',   label: 'Favoritos',  icon: '' },
  { path: '/carrito',    label: 'Carrito',    icon: '' },
  { path: '/contacto',   label: 'Contacto',   icon: '' },
  { path: '/login',      label: 'Cuenta',     icon: '' },
];

export default function Header({ subtitle }) {
  const { pathname } = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'linear-gradient(135deg, #FFA1C7 0%, #ec4899 50%, #db2777 100%)',
        boxShadow: '0 4px 20px rgba(223, 13, 88, 0.25)',
      }}
    >
      <div className="flex items-center justify-center lg:justify-start px-4 py-5 lg:px-10 gap-0 lg:gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img src={yuhuLogo} alt="Yuhi Logo" className="h-12 w-auto transition-transform group-hover:scale-105" />
          <span className="hidden lg:block text-xs text-white/50 font-medium">Cultura asiática & Otaku</span>
        </Link>

        {/* Desktop nav - left aligned */}
        <nav className="hidden lg:flex items-center gap-2">
          {NAV_ITEMS.map(({ path, label, icon }) => {
            const active = pathname === path || (path !== '/' && pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center gap-3 px-5 h-10 rounded-full transition-all text-base font-semibold ${active ? 'bg-white/25 text-white' : 'text-white/80'}`}
                style={{ alignItems: 'center' }}
              >
                {icon ? <span className="text-lg leading-none">{icon}</span> : null}
                <span className="leading-none">{label}</span>
                {path === '/carrito' && cartCount > 0 && (
                  <span
                    className="ml-2 inline-flex items-center justify-center rounded-full h-5 w-5 text-[11px] font-bold"
                    style={{ background: '#fff', color: '#db2777' }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {subtitle && (
        <div className="px-4 pb-3 lg:px-8 text-center lg:text-left">
          <p className="text-white/90 text-sm font-bold">{subtitle}</p>
        </div>
      )}
    </header>
  );
}
