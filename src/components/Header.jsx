import { Link } from 'react-router-dom';
import yuhuLogo from '../assets/Yuhi logo web.png';

export default function Header({ subtitle }) {
  return (
    <header
      className="px-4 pt-8 pb-12 text-center"
      style={{ 
        background: "linear-gradient(135deg, #FFA1C7 0%, #ec4899 50%, #db2777 100%)",
        boxShadow: "0 12px 40px rgba(223, 13, 88, 0.25)"
      }}
    >
      <Link to="/" className="inline-block group">
        <div
          className="inline-flex items-center justify-center rounded-3xl px-32 py-6 transition-transform group-hover:scale-105 group-active:scale-95"
          style={{ background: '#ffffff' }}
        >
          <img src={yuhuLogo} alt="Yuhi Logo" className="h-16 w-auto drop-shadow-xl" />
        </div>
      </Link>
      {subtitle && (
        <p className="text-white/95 text-lg mt-4 font-bold drop-shadow-md">{subtitle}</p>
      )}
    </header>
  );
}
