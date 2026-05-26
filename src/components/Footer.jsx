import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-[#274156] pt-12 pb-8 mt-auto text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-bold mb-4">Yuhi</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Tu destino premium para productos de importación y cultura asiática. 
            Calidad seleccionada directamente desde Japón y China.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/60">Explorar</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-[#FFA1C7] transition-colors">Inicio</Link></li>
            <li><Link to="/categorias" className="hover:text-[#FFA1C7] transition-colors">Categorías</Link></li>
            <li><Link to="/ofertas" className="hover:text-[#FFA1C7] transition-colors">Comparador</Link></li>
            <li><Link to="/api-catalog" className="hover:text-[#FFA1C7] transition-colors">Importación Directa</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/60">Soporte</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/contacto" className="hover:text-[#FFA1C7] transition-colors">Contacto</Link></li>
            <li><a href="#" className="hover:text-[#FFA1C7] transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-[#FFA1C7] transition-colors">Envíos y Devoluciones</a></li>
            <li><a href="#" className="hover:text-[#FFA1C7] transition-colors">Aviso Legal</a></li>
          </ul>
        </div>

        {/* Social & Payments */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/60">Conectar</h4>
          <div className="flex flex-col gap-1 mb-6 text-sm text-white/80">
            <p>Instagram:Yuhi_Store</p>
            <p>Facebook:Yuhi_Store</p>
            <p>X:Yuhi_Store</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/60">
          © {year} Yuhi Store. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 text-xs text-white/60">
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
          <a href="#" className="hover:text-white transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  );
}