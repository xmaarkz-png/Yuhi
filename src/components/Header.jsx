import { Link } from 'react-router-dom';

export default function Header({ subtitle }) {
  return (
    <header
      className="px-4 pt-10 pb-6 text-center"
      style={{ background: 'linear-gradient(135deg,#FFA1C7 0%,#1C6E8C 100%)' }}
    >
      <Link to="/" className="inline-block">
        <div
          className="inline-flex items-center justify-center rounded-2xl px-6 py-2"
          style={{ background: 'rgba(39,65,86,0.35)' }}
        >
          <span className="text-white font-bold text-2xl italic tracking-wide">
            Yuhi
          </span>
        </div>
      </Link>
      {subtitle && (
        <p className="text-white/80 text-xs mt-2">{subtitle}</p>
      )}
    </header>
  );
}
