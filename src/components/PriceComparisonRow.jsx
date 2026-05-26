/**
 * PriceComparisonRow — horizontal comparison strip showing the same
 * product across multiple sources, ordered by price.
 */
export default function PriceComparisonRow({ results }) {
  if (!results || results.length === 0) return null;

  const withPrice = results.filter((r) => r.price !== null);
  if (withPrice.length === 0) return null;

  const cheapest = withPrice[0];

  return (
    <div className="rounded-2xl p-3 mb-4" style={{background:'rgba(28,110,140,0.07)',border:'1px solid rgba(28,110,140,0.2)'}}>
      <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{color:'#1C6E8C'}}>
        💰 Comparativa de precios
      </p>
      <div className="flex flex-col gap-2">
        {withPrice.map((r, i) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
              i === 0
                ? 'font-bold shadow text-white'
                : 'bg-white text-gray-700 border border-gray-100'
            }`}
            style={i === 0 ? {background:'#1C6E8C'} : {}}
          >
            <span className="flex items-center gap-2">
              <span>{r.sourceIcon}</span>
              <span>{r.source}</span>
              {i === 0 && (
                <span className="bg-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1" style={{color:'#1C6E8C'}}>
                  Mejor precio
                </span>
              )}
            </span>
            <span className={i === 0 ? 'text-white' : 'font-semibold'} style={i !== 0 ? {color:'#1C6E8C'} : {}}>
              €{r.price.toFixed(2)}
            </span>
          </a>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-2 text-right">
        * Los precios pueden variar. Al hacer clic serás redirigido a la tienda con enlace de afiliado.
      </p>
    </div>
  );
}
