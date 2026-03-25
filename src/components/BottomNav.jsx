import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Inicio', icon: '🏠' },
  { path: '/categorias', label: 'Categorías', icon: '📦' },
  { path: '/ofertas', label: 'Ofertas', icon: '🏷️' },
  { path: '/contacto', label: 'Contacto', icon: '💬' },
  { path: '/login', label: 'Login', icon: '👤' },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{ 
        background: '#FBFCFF', 
        borderTop: '3px solid #FFA1C7',
        boxShadow: '0 -8px 32px rgba(255, 161, 199, 0.15)'
      }}
    >
      <div className="flex items-center justify-around h-20">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const active = pathname === path || (path !== '/' && pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-1 flex-1 py-2 transition-all hover:scale-110 active:scale-95"
            >
              <span className={`text-3xl transition-transform ${active ? 'scale-125' : ''}`}>
                {icon}
              </span>
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



