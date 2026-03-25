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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 lg:hidden"
      style={{ background: '#FBFCFF', borderTop: '1px solid #D0CCD0' }}
    >
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const active = pathname === path || (path !== '/' && pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-0.5 flex-1 py-2"
            >
              <span className="text-xl leading-none">{icon}</span>
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? '#1C6E8C' : '#D0CCD0' }}
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



