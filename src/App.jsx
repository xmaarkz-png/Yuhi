import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Sidebar from "./components/Sidebar";
import Inicio from "./pages/Inicio";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative lg:flex lg:min-h-screen">
        <Sidebar />
        <div className="lg:flex-1 lg:min-w-0 min-h-screen" style={{ background: '#FBFCFF' }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
