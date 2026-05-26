import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import BottomNav from "./components/BottomNav";
import Inicio from "./pages/Inicio";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="relative min-h-screen" style={{ background: '#FBFCFF' }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
