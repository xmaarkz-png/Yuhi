import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import yuhuLogo from '../assets/Yuhi logo web.png';

const ICONS = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 21h14a1 1 0 0 0 1-1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  categories: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/></svg>
  ),
  tag: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.59 13.41L12 21.99 2 12 10.59 3 20.59 13.41z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
  ),
  compare: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8 7.6a4.4 4.4 0 0 0-6.2 0L12 10.2l-2.6-2.6a4.4 4.4 0 1 0-6.2 6.2L12 22l8.8-8.8a4.4 4.4 0 0 0 0-6.2z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
  ),
  cart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6h15l-1.5 9h-12L4 3H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="10" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/></svg>
  ),
  contact: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
  ),
};

const NAV_ITEMS = [
  { path: '/', label: 'Inicio', icon: ICONS.home },
  { path: '/categorias', label: 'Categorías', icon: ICONS.categories },
  { path: '/ofertas', label: 'Ofertas', icon: ICONS.tag },
  { path: '/comparar', label: 'Comparador', icon: ICONS.compare },
  { path: '/wishlist', label: 'Favoritos', icon: ICONS.heart },
  { path: '/carrito', label: 'Carrito', icon: ICONS.cart },
  { path: '/contacto', label: 'Contacto', icon: ICONS.contact },
  { path: '/login', label: 'Login', icon: ICONS.user },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('yuhi_bottomnav_hidden_v1') === '1';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('yuhi_bottomnav_hidden_v1', collapsed ? '1' : '0');
    } catch (e) {}
  }, [collapsed]);

  return (
    <>
      {/* Toggle handle visible on mobile to collapse/expand bottom nav */}
      <button
        aria-label={collapsed ? 'Mostrar navegación' : 'Ocultar navegación'}
        onClick={() => setCollapsed(!collapsed)}
        className="fixed left-1/2 -translate-x-1/2 z-60 lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md"
        style={{ bottom: collapsed ? 16 : 96 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <nav
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 lg:hidden transition-transform duration-300 ${collapsed ? 'translate-y-full' : 'translate-y-0'}`}
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

      <div className="flex items-center justify-start h-20 overflow-x-auto no-scrollbar px-6 gap-8">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const active = pathname === path || (path !== '/' && pathname.startsWith(path));
          const isCart = path === '/carrito';
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-1 shrink-0 py-2 transition-all hover:scale-110 active:scale-95 relative"
            >
              {isCart && cartCount > 0 && (
                <span 
                  className="absolute top-2 right-4 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                  style={{ background: '#FFA1C7' }}
                >
                  {cartCount}
                </span>
              )}
              <span className="w-6 h-6 text-center" style={{ color: active ? '#FFA1C7' : '#D0CCD0' }}>{icon}</span>
              <span
                className="text-[10px] font-bold text-center px-1 uppercase tracking-tighter"
                style={{ color: active ? '#FFA1C7' : '#D0CCD0' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      </nav>
    </>
  );
}
