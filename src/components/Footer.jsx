import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-[#274156] pt-8 lg:pt-12 pb-60 lg:pb-12 mt-auto text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 text-center lg:text-left">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Yuhi</h3>
          <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-xs mx-auto md:mx-0">
            Tu destino premium para productos de importación y cultura asiática. 
            Calidad seleccionada directamente desde Japón y China.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold mb-2 md:mb-4 text-[11px] md:text-sm uppercase tracking-wider text-white/60">Explorar</h4>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-white/80">
            <li><Link to="/" className="hover:text-[#FFA1C7] transition-colors">Inicio</Link></li>
            <li><Link to="/categorias" className="hover:text-[#FFA1C7] transition-colors">Categorías</Link></li>
            <li><Link to="/ofertas" className="hover:text-[#FFA1C7] transition-colors">Ofertas</Link></li>
            <li><Link to="/comparar" className="hover:text-[#FFA1C7] transition-colors">Dúos</Link></li>
            <li><Link to="/api-catalog" className="hover:text-[#FFA1C7] transition-colors">Importación Directa</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold mb-2 md:mb-4 text-[11px] md:text-sm uppercase tracking-wider text-white/60">Soporte</h4>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-white/80">
            <li><Link to="/contacto" className="hover:text-[#FFA1C7] transition-colors">Contacto</Link></li>
            <li><a href="#" className="hover:text-[#FFA1C7] transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-[#FFA1C7] transition-colors">Envíos y Devoluciones</a></li>
            <li><a href="#" className="hover:text-[#FFA1C7] transition-colors">Aviso Legal</a></li>
          </ul>
        </div>

        {/* Social & Payments */}
        <div className="hidden lg:flex flex-col items-center lg:items-start">
          <h4 className="font-bold mb-2 lg:mb-4 text-[11px] lg:text-sm uppercase tracking-wider text-white/60">Conectar</h4>
          <div className="flex flex-col gap-1 text-xs lg:text-sm text-white/80">
            <p>Instagram:Yuhi_Store</p>
            <p>Facebook:Yuhi_Store</p>
            <p>X:Yuhi_Store</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
        <p className="text-[10px] lg:text-xs text-white/60">
          © {year} Yuhi Store. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs text-white/60">
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
          <a href="#" className="hover:text-white transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  );
}