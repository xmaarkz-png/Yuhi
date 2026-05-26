import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import BottomNav from "./components/BottomNav";
import Inicio from "./pages/Inicio";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";
import Wishlist from "./pages/Wishlist";
import ApiCatalog from "./pages/ApiCatalog";
import CompararProductos from "./pages/CompararProductos";

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <div className="relative min-h-screen" style={{ background: '#FBFCFF' }}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/api-catalog" element={<ApiCatalog />} />
              <Route path="/comparar" element={<CompararProductos />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}
