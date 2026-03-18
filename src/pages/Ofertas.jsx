import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import PriceComparisonRow from '../components/PriceComparisonRow';
import { compareAllSources, getMockResults } from '../services/api';

const SOURCES = [
  { id: 'all', label: 'Todos' },
  { id: 'Amazon', label: '🛒 Amazon' },
  { id: 'Google Shopping', label: '🛍️ Google' },
  { id: 'AliExpress', label: '🏪 AliExpress' },
  { id: 'eBay', label: '🔖 eBay' },
];

const SORT_OPTIONS = [
  { id: 'price_asc', label: '💰 Menor precio' },
  { id: 'price_desc', label: '💸 Mayor precio' },
  { id: 'rating', label: '⭐ Valoración' },
];

export default function Ofertas() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [inputVal, setInputVal] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSource, setActiveSource] = useState('all');
  const [sortBy, setSortBy] = useState('price_asc');
  const [searched, setSearched] = useState(false);
  const [usedMock, setUsedMock] = useState(false);

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    setUsedMock(false);

    try {
      let data = await compareAllSources(q);
      if (data.length === 0) {
        // Fall back to mock data so devs can see the UI
        data = getMockResults(q);
        setUsedMock(true);
      }
      setResults(data);
    } catch (err) {
      console.error(err);
      // On API error, show mock results
      setResults(getMockResults(q));
      setUsedMock(true);
      setError('Las APIs externas no están disponibles. Mostrando datos de ejemplo.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search from URL param
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setInputVal(q);
      setQuery(q);
      doSearch(q);
    }
  }, [searchParams, doSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = inputVal.trim();
    if (!q) return;
    setQuery(q);
    navigate(`/ofertas?q=${encodeURIComponent(q)}`, { replace: true });
    doSearch(q);
  };

  // Filter & sort
  const filtered = results
    .filter((r) => activeSource === 'all' || r.source === activeSource)
    .sort((a, b) => {
      if (sortBy === 'price_asc') {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      }
      if (sortBy === 'price_desc') {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  const cheapest = filtered.find((r) => r.price !== null);

  return (
    <div className="pb-20">
      <Header subtitle="Comparador de precios" />

      <div className="px-4 py-4">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Buscar producto asiático…"
            className="flex-1 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2" style={{background:'#D0CCD0',color:'#274156'}} onFocus={e=>e.target.style.outlineColor='#1C6E8C'}
          />
          <button
            type="submit"
            className="text-white px-5 py-3 rounded-2xl text-sm font-semibold transition-opacity hover:opacity-90" style={{background:'#1C6E8C'}}
          >
            🔍
          </button>
        </form>

        {/* API Status Banner */}
        {usedMock && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 text-xs text-yellow-700 mb-3 flex items-start gap-2">
            <span>⚠️</span>
            <span>
              <strong>Modo demo:</strong> {error || 'Sin claves API — mostrando datos de ejemplo.'}{' '}
              Configura <code>VITE_TMAPI_KEY</code> y <code>VITE_SERPAPI_KEY</code> en tu .env para datos reales.
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Buscando en todas las tiendas…</p>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            {results.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-800">{filtered.length}</span> resultados para{' '}
                    <span className="font-semibold" style={{color:'#1C6E8C'}}>"{query}"</span>
                  </p>
                </div>

                {/* Price comparison strip */}
                <PriceComparisonRow results={filtered} />

                {/* Source filter tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 mb-3 no-scrollbar">
                  {SOURCES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSource(s.id)}
                      className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                        activeSource === s.id
                          ? 'text-white'
                          : 'text-gray-500 hover:opacity-80'
                      }`}
                      style={activeSource === s.id ? {background:'#1C6E8C'} : {background:'#D0CCD0'}}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <div className="flex gap-2 overflow-x-auto pb-1 mb-4 no-scrollbar">
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`whitespace-nowrap text-xs px-3 py-1 rounded-full border transition-colors ${
                        sortBy === s.id
                          ? ''
                          : 'border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                      style={sortBy === s.id ? {borderColor:'#FFA1C7',color:'#1C6E8C',background:'rgba(255,161,199,0.1)'} : {}}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {filtered.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showSource
                      highlight={product === cheapest}
                    />
                  ))}
                </div>
              </>
            )}

            {results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
                <span className="text-5xl">🔍</span>
                <p className="text-gray-600 font-semibold">Sin resultados</p>
                <p className="text-gray-400 text-sm">Prueba con otro término de búsqueda</p>
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && !searched && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <span className="text-6xl">🛍️</span>
            <p className="text-gray-700 font-semibold text-base">Compara precios al instante</p>
            <p className="text-gray-400 text-sm max-w-xs">
              Busca cualquier producto y encontraremos el mejor precio en Amazon, eBay, AliExpress y más.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['Ramen', 'Kimono', 'Figura Goku', 'Matcha'].map((s) => (
                <button
                  key={s}
                  onClick={() => { setInputVal(s); doSearch(s); setQuery(s); }}
                  className="text-sm px-3 py-1.5 rounded-full transition-opacity hover:opacity-80" style={{background:'rgba(255,161,199,0.15)',color:'#1C6E8C'}}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
