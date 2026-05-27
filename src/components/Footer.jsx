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
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold mb-2 lg:mb-4 text-[11px] lg:text-sm uppercase tracking-wider text-white/60">Conectar</h4>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <a href="https://www.instagram.com/Yuhi_Store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.2" fill="none" />
                <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="white" />
              </svg>
              <span>Instagram: Yuhi_Store</span>
            </a>

            <a href="https://www.facebook.com/Yuhi_Store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.5v-2.9h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" fill="white" />
              </svg>
              <span>Facebook: Yuhi_Store</span>
            </a>

            <a href="https://twitter.com/Yuhi_Store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 5.92c-.63.28-1.31.47-2.02.56.73-.44 1.29-1.14 1.55-1.98-.68.4-1.43.7-2.23.86C18.32 4.6 17.36 4 16.28 4c-1.58 0-2.86 1.28-2.86 2.86 0 .22.02.44.07.65C10.48 7.4 7.24 5.57 5.1 3.01c-.25.43-.39.93-.39 1.46 0 1.01.51 1.9 1.29 2.42-.6-.02-1.17-.18-1.67-.46v.05c0 1.39.99 2.55 2.31 2.82-.24.07-.5.11-.77.11-.19 0-.38-.02-.56-.05.38 1.18 1.48 2.04 2.78 2.06C9.1 14.8 7.7 15.36 6.22 15.36c-.12 0-.24 0-.36-.01C7.59 16.19 9.27 16.7 11.06 16.7c5.28 0 8.17-4.37 8.17-8.17v-.37c.56-.4 1.04-.9 1.42-1.47-.51.23-1.06.38-1.63.45z" fill="white" />
              </svg>
              <span>X: Yuhi_Store</span>
            </a>
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