import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getCheapestPrice, STORE_META } from '../data/catalog';
import { getCachedProductsByQuery } from '../services/api';
import { useEffect } from 'react';

export default function CompararProductos() {
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [selectedP1, setSelectedP1] = useState(null);
  const [selectedP2, setSelectedP2] = useState(null);
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const formatForCard = (p) => {
    if (!p) return null;
    // If it's an API-normalized product (has price and url), use it directly
    if (typeof p.price === 'number' || p.price !== null) {
      return p;
    }
    // Fallback for catalog items
    const cheapest = getCheapestPrice(p);
    return cheapest ? {
      ...p,
      price: cheapest.price,
      currency: cheapest.currency,
      url: cheapest.url,
      inStock: cheapest.inStock,
      source: STORE_META[cheapest.store]?.name || cheapest.store,
      sourceIcon: STORE_META[cheapest.store]?.icon || '',
      store: cheapest.store,
    } : null;
  };

  // Debounced cached search for query1 (no API calls)
  useEffect(() => {
    if (!query1 || query1.length < 3) {
      setResults1([]);
      return;
    }
    let cancelled = false;
    setLoading1(true);
    const t = setTimeout(() => {
      const r = getCachedProductsByQuery(query1, 8);
      if (!cancelled) setResults1(r || []);
      setLoading1(false);
    }, 200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [query1]);

  // Debounced cached search for query2 (no API calls)
  useEffect(() => {
    if (!query2 || query2.length < 3) {
      setResults2([]);
      return;
    }
    let cancelled = false;
    setLoading2(true);
    const t = setTimeout(() => {
      const r = getCachedProductsByQuery(query2, 8);
      if (!cancelled) setResults2(r || []);
      setLoading2(false);
    }, 200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [query2]);

  const p1Card = formatForCard(selectedP1);
  const p2Card = formatForCard(selectedP2);

  const isCheaper = (pA, pB) => {
    if (!pA || !pB) return false;
    return pA.price < pB.price;
  };

  return (
    <div className="min-h-screen bg-[#FBFCFF] flex flex-col">
      <Header subtitle="Comparativa de Productos" />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#274156] uppercase tracking-tight">Comparador Dual</h1>
          <p className="text-sm text-[#506B75] mt-1">Busca dos productos similares y descubre cuál tiene el precio más bajo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Slot 1 */}
          <div className="flex flex-col gap-6">
            <div className="relative">
              <label className="text-[10px] font-bold text-[#1C6E8C] uppercase tracking-widest mb-2 block">Producto A</label>
              <input
                type="text"
                value={query1}
                onChange={(e) => { setQuery1(e.target.value); setSelectedP1(null); }}
                placeholder="Escribe para buscar..."
                className="w-full px-5 py-3 rounded-2xl bg-white border border-[#F0E6EA] outline-none focus:border-[#1C6E8C] text-sm shadow-sm"
              />
              {(results1.length > 0 || loading1) && !selectedP1 && (
                <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-xl border border-[#F0E6EA] max-h-60 overflow-y-auto no-scrollbar">
                  {loading1 ? (
                    <div className="p-4 text-sm text-slate-500">Buscando...</div>
                  ) : (
                    results1.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedP1(p); setQuery1(p.title); }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm border-b border-[#F0E6EA] last:border-0 transition-colors"
                    >
                      <p className="font-bold text-[#274156]">{p.title}</p>
                        <p className="text-[10px] text-[#1C6E8C] font-semibold mt-1">
                          Desde {p.currency || '€'}{typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                        </p>
                    </button>
                    ))
                  )}
                </div>
              )}
            </div>
            {p1Card && (
              <div className={`transition-all duration-500 relative ${isCheaper(p1Card, p2Card) ? 'ring-4 ring-[#1C6E8C] rounded-[32px] scale-[1.02]' : 'opacity-90'}`}>
                {isCheaper(p1Card, p2Card) && (
                  <div className="bg-[#1C6E8C] text-white text-[9px] font-black px-3 py-1 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 z-10 shadow-lg tracking-widest uppercase">
                    Precio más bajo
                  </div>
                )}
                <ProductCard product={p1Card} />
              </div>
            )}
          </div>

          {/* Slot 2 */}
          <div className="flex flex-col gap-6">
            <div className="relative">
              <label className="text-[10px] font-bold text-[#1C6E8C] uppercase tracking-widest mb-2 block">Producto B</label>
              <input
                type="text"
                value={query2}
                onChange={(e) => { setQuery2(e.target.value); setSelectedP2(null); }}
                placeholder="Escribe para buscar..."
                className="w-full px-5 py-3 rounded-2xl bg-white border border-[#F0E6EA] outline-none focus:border-[#1C6E8C] text-sm shadow-sm"
              />
              {(results2.length > 0 || loading2) && !selectedP2 && (
                <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-xl border border-[#F0E6EA] max-h-60 overflow-y-auto no-scrollbar">
                  {loading2 ? (
                    <div className="p-4 text-sm text-slate-500">Buscando...</div>
                  ) : (
                    results2.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedP2(p); setQuery2(p.title); }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm border-b border-[#F0E6EA] last:border-0 transition-colors"
                    >
                      <p className="font-bold text-[#274156]">{p.title}</p>
                        <p className="text-[10px] text-[#1C6E8C] font-semibold mt-1">
                          Desde {p.currency || '€'}{typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                        </p>
                    </button>
                    ))
                  )}
                </div>
              )}
            </div>
            {p2Card && (
              <div className={`transition-all duration-500 relative ${isCheaper(p2Card, p1Card) ? 'ring-4 ring-[#1C6E8C] rounded-[32px] scale-[1.02]' : 'opacity-90'}`}>
                {isCheaper(p2Card, p1Card) && (
                  <div className="bg-[#1C6E8C] text-white text-[9px] font-black px-3 py-1 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 z-10 shadow-lg tracking-widest uppercase">
                    Precio más bajo
                  </div>
                )}
                <ProductCard product={p2Card} />
              </div>
            )}
          </div>
        </div>

        {p1Card && p2Card && (
          <div className="w-full flex justify-center mt-24 mb-40 px-4">
            <div className="p-10 bg-white rounded-[40px] border border-[#F0E6EA] shadow-xl text-center max-w-md w-full flex flex-col items-center">
              <h2 className="text-sm font-bold text-[#1C6E8C] mb-4 uppercase tracking-[0.2em]">Veredicto</h2>
              <p className="text-[#274156] text-lg leading-relaxed">
                El producto <span className="font-black text-[#1C6E8C]">{isCheaper(p1Card, p2Card) ? p1Card.title : p2Card.title}</span> tiene el mejor precio actualmente.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="text-xs text-[#506B75]">Diferencia de ahorro:</span>
                <span className="text-2xl font-black text-[#0F766E]">
                  {p1Card.currency}{Math.abs(p1Card.price - p2Card.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}