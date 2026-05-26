import { useWishlist } from '../context/WishlistContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const userRaw = localStorage.getItem("yuhi_user");

  useEffect(() => {
    if (!userRaw) {
      navigate('/login');
    }
  }, [userRaw]);

  if (!userRaw) return null;

  return (
    <div className="pb-20 min-h-screen flex flex-col" style={{ background: '#FBFCFF' }}>
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#274156]">Mis Favoritos</h1>
          <p className="text-sm text-[#506B75] mt-1">Tus productos seleccionados de importación y catálogo.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px] border border-[#F0E6EA]">
            <p className="text-slate-400 mb-6">Aún no has guardado ningún producto.</p>
            <Link to="/" className="inline-block px-8 py-3 rounded-full font-bold bg-[#1C6E8C] text-white">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={`${product.id}-${product.store}`} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}