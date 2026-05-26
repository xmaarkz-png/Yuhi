import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { searchTaobaoProducts } from "../services/elimApi";

export default function ApiCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("anime");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const data = await searchTaobaoProducts(query);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const price = p.price;
    const min = minPrice === "" ? 0 : parseFloat(minPrice);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);
    return price >= min && price <= max;
  });

  return (
    <div className="min-h-screen bg-[#FBFCFF]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#274156]">Productos de Importación</h1>
            <p className="text-sm text-[#506B75]">Resultados en tiempo real vía Elim API (Taobao)</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-4 py-2 rounded-xl border border-[#F0E6EA] focus:outline-none focus:border-[#1C6E8C] text-sm"
                placeholder="Buscar en Taobao..."
              />
              <button 
                onClick={fetchProducts}
                className="bg-[#1C6E8C] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#165a74] transition-colors text-sm"
              >
                Buscar
              </button>
            </div>
            
            <div className="flex gap-2 items-center">
              <input 
                type="number" 
                placeholder="Min ¥" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 px-3 py-2 rounded-xl border border-[#F0E6EA] text-xs outline-none focus:border-[#1C6E8C]"
              />
              <span className="text-slate-300">-</span>
              <input 
                type="number" 
                placeholder="Max ¥" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 px-3 py-2 rounded-xl border border-[#F0E6EA] text-xs outline-none focus:border-[#1C6E8C]"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C6E8C]"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                highlight={false} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#506B75]">No se encontraron productos. Intenta con otra palabra clave.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}