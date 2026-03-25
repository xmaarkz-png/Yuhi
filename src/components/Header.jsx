import { Link } from 'react-router-dom';

export default function Header({ subtitle }) {
  return (
    <header
      className="px-4 pt-10 pb-6 text-center lg:flex lg:items-center lg:px-10 lg:pt-5 lg:pb-5 lg:text-left"
      style={{ background: 'linear-gradient(135deg,#FFA1C7 0%,#1C6E8C 100%)' }}
    >
      {/* Logo — mobile only; sidebar shows it on desktop */}
      <Link to="/" className="inline-block lg:hidden">
        <div
          className="inline-flex items-center justify-center rounded-2xl px-6 py-2"
          style={{ background: 'rgba(39,65,86,0.35)' }}
        >
          <span className="text-white font-bold text-2xl italic tracking-wide">Yuhi</span>
        </div>
      </Link>
      {subtitle ? (
        <p className="text-white/80 text-xs mt-2 lg:mt-0 lg:text-xl lg:font-bold lg:text-white">
          {subtitle}
        </p>
      ) : (
        <p className="hidden lg:block text-white text-xl font-bold italic">Bienvenido</p>
      )}
    </header>
  );
}
