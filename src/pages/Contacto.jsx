import { useState } from "react";
import Header from "../components/Header";
import AuthButton from "../components/AuthButton";
import Footer from "../components/Footer";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="pb-20 min-h-screen lg:flex lg:flex-col" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-5 lg:pt-0 lg:flex-1 lg:flex lg:items-center lg:justify-center">
        <div className="w-full lg:max-w-4xl lg:mx-auto lg:px-10">
        <h2 className="text-base font-semibold mb-4 lg:text-xl lg:mb-8" style={{ color: "#274156" }}>Contacto</h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        {/* Info */}
        <div className="flex flex-col gap-3 mb-6 lg:mb-0">
          {[
            { icon: "", label: "TELÉFONO", value: "+34 123 456 789" },
            { icon: "", label: "DIRECCIÓN", value: "Calle Yuhi, 12, Zaragoza" },
            { icon: "", label: "HORARIO", value: "Lun-Dom: 13:00 - 22:00" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <div>
                <p className="text-[11px]" style={{ color: "#1C6E8C" }}>{row.label}</p>
                <p className="text-sm font-medium" style={{ color: "#274156" }}>{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
        {sent ? (
          <div className="flex flex-col items-center py-12 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mb-2">OK</div>
            <p className="font-semibold" style={{ color: "#274156" }}>Mensaje enviado</p>
            <button onClick={() => setSent(false)} className="text-sm underline" style={{ color: "#1C6E8C" }}>
              Enviar otro
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-3">
            {[
              { name: "nombre", placeholder: "Nombre", type: "text" },
              { name: "email", placeholder: "Email", type: "email" },
            ].map((f) => (
              <input
                key={f.name}
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={change}
                placeholder={f.placeholder}
                required
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                style={{ background: "#D0CCD0", color: "#274156" }}
              />
            ))}
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={change}
              placeholder="Mensaje"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
              style={{ background: "#D0CCD0", color: "#274156" }}
            />
            <AuthButton type="submit" variant="primary">
              Enviar Mensaje
            </AuthButton>
          </form>
        )}
        </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
