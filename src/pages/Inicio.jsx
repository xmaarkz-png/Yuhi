import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CATEGORIES = [
  { id: 'merchandising', label: 'Merchandising', icon: '🎁', emoji: '🎌', color: 'bg-purple-50 border-purple-200' },
  { id: 'alimentacion', label: 'Alimentación', icon: '🍜', emoji: '🍣', color: 'bg-orange-50 border-orange-200' },
  { id: 'ropa', label: 'Ropa', icon: '👕', emoji: '👘', color: 'bg-blue-50 border-blue-200' },
  { id: 'literatura', label: 'Literatura', icon: '📚', emoji: '📖', color: 'bg-green-50 border-green-200' },
];

const FEATURED_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', alt: 'Ramen' },
  { src: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400', alt: 'Anime merch' },
  { src: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400', alt: 'Manga' },
];

export default function Inicio() {
  const navigate = useNavigate();
  const [featuredIdx] = useState(0);

  return (
    <div className="pb-20">
      <Header subtitle="Tu tienda asiática & otaku" />

      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <img
          src={FEATURED_IMAGES[featuredIdx].src}
          alt="Featured"
          className="w-full h-44 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <span className="text-white font-bold text-lg leading-tight">
            Descubre los mejores productos
          </span>
          <span className="text-pink-200 text-sm">directamente de Asia 🎌</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <button
          onClick={() => navigate('/ofertas')}
          className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition-colors rounded-2xl px-4 py-3 text-gray-400 text-sm"
        >
          <span className="text-lg">🔍</span>
          <span>Buscar y comparar precios…</span>
        </button>
      </div>

      {/* Categories */}
      <section className="px-4">
        <h2 className="text-base font-bold text-gray-800 mb-3">Categorías</h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/categorias?cat=${cat.id}`)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${cat.color} hover:scale-105 transition-transform active:scale-95`}
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-3xl">
                {cat.emoji}
              </div>
              <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Quick Compare CTA */}
      <section className="px-4 mt-6">
        <div className="rounded-2xl p-4 text-white flex items-center justify-between" style={{background:'linear-gradient(135deg,#FFA1C7,#1C6E8C)'}}>
          <div>
            <p className="font-bold text-base">Compara precios</p>
            <p className="text-white/70 text-xs mt-0.5">Amazon, eBay, AliExpress y más</p>
          </div>
          <button
            onClick={() => navigate('/ofertas')}
            className="font-bold text-sm px-4 py-2 rounded-xl hover:opacity-90 transition-opacity" style={{background:'#274156',color:'#FFA1C7'}}
          >
            Buscar →
          </button>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="px-4 mt-6">
        <h2 className="text-base font-bold text-gray-800 mb-3">Búsquedas populares</h2>
        <div className="flex flex-wrap gap-2">
          {['Ramen', 'Figura Naruto', 'Kimono', 'Manga One Piece', 'Matcha', 'Sake', 'Takoyaki'].map((term) => (
            <button
              key={term}
              onClick={() => navigate(`/ofertas?q=${encodeURIComponent(term)}`)}
              className="transition-colors text-sm px-3 py-1.5 rounded-full" style={{background:'#D0CCD0',color:'#274156'}}
            >
              {term}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
