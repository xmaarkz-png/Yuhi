import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import yuhuLogo from '../assets/Yuhi logo web.png';

const ICONS = {
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 21h14a1 1 0 0 0 1-1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  categories: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/></svg>
  ),
  tag: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.59 13.41L12 21.99 2 12 10.59 3 20.59 13.41z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
  ),
  compare: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8 7.6a4.4 4.4 0 0 0-6.2 0L12 10.2l-2.6-2.6a4.4 4.4 0 1 0-6.2 6.2L12 22l8.8-8.8a4.4 4.4 0 0 0 0-6.2z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
  ),
  cart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6h15l-1.5 9h-12L4 3H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="10" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/></svg>
  ),
  contact: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
  ),
};

const NAV_ITEMS = [
  { path: '/',           label: 'Inicio',     icon: ICONS.home },
  { path: '/categorias', label: 'Categorías', icon: ICONS.categories },
  { path: '/ofertas',    label: 'Ofertas',    icon: ICONS.tag },
  { path: '/comparar',   label: 'Comparador', icon: ICONS.compare },
  { path: '/wishlist',   label: 'Favoritos',  icon: ICONS.heart },
  { path: '/carrito',    label: 'Carrito',    icon: ICONS.cart },
  { path: '/contacto',   label: 'Contacto',   icon: ICONS.contact },
  { path: '/login',      label: 'Cuenta',     icon: ICONS.user },
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
