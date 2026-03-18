import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { getMockResults } from '../services/api';

const CATEGORIES = [
  { id: 'merchandising', label: 'Merchandising', icon: '🎌', queries: ['figura anime', 'póster manga', 'muñeco naruto', 'funko pop anime'] },
  { id: 'alimentacion', label: 'Alimentación', icon: '🍜', queries: ['ramen japonés', 'matcha', 'mochi', 'takoyaki kit'] },
  { id: 'ropa', label: 'Ropa', icon: '👘', queries: ['kimono', 'camiseta anime', 'yukata', 'streetwear japonés'] },
  { id: 'literatura', label: 'Literatura', icon: '📚', queries: ['manga one piece', 'manga naruto', 'manga attack on titan', 'libro japonés'] },
];

export default function Categorias() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activecat, setActivecat] = useState(searchParams.get('cat') || 'merchandising');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.id === activecat);
    if (!cat) return;
    setLoading(true);
    // Show mock products relevant to the category
    const randomQuery = cat.queries[Math.floor(Math.random() * cat.queries.length)];
    setTimeout(() => {
      setProducts(getMockResults(randomQuery));
      setLoading(false);
    }, 500);
  }, [activecat]);

  const activeCatObj = CATEGORIES.find((c) => c.id === activecat);

  return (
    <div className="pb-20">
      <Header subtitle="Explora por categoría" />

      <div className="px-4 py-4">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActivecat(cat.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                activecat === cat.id
                  ? 'text-white shadow'
                  : 'text-gray-500'
              }`}
              style={activecat === cat.id ? {background:'#1C6E8C'} : {background:'#D0CCD0'}}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Compare CTA */}
        {activeCatObj && (
          <div className="rounded-2xl px-4 py-3 mb-4 flex items-center justify-between" style={{background:'rgba(28,110,140,0.07)',border:'1px solid rgba(28,110,140,0.2)'}}>
            <div>
              <p className="text-sm font-semibold text-gray-700">{activeCatObj.icon} {activeCatObj.label}</p>
              <p className="text-xs text-gray-400">Compara precios en múltiples tiendas</p>
            </div>
            <button
              onClick={() => navigate(`/ofertas?q=${encodeURIComponent(activeCatObj.queries[0])}`)}
              className="text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-90 transition-opacity" style={{background:'#1C6E8C'}}
            >
              Comparar
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{borderColor:'#D0CCD0',borderTopColor:'#1C6E8C'}} />
          </div>
        )}

        {/* Products grid — vertical cards */}
        {!loading && (
          <>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Productos populares
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} showSource={false} />
                </div>
              ))}
            </div>

            {/* Quick search chips */}
            {activeCatObj && (
              <div className="mt-5">
                <p className="text-xs text-gray-400 mb-2 font-medium">Búsquedas sugeridas</p>
                <div className="flex flex-wrap gap-2">
                  {activeCatObj.queries.map((q) => (
                    <button
                      key={q}
                      onClick={() => navigate(`/ofertas?q=${encodeURIComponent(q)}`)}
                      className="transition-colors text-xs px-3 py-1.5 rounded-full hover:opacity-80" style={{background:'#D0CCD0',color:'#274156'}}
                    >
                      🔍 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
