import { useState } from 'react';
import Header from '../components/Header';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: send to your backend / email service
    setSent(true);
  };

  return (
    <div className="pb-20">
      <Header subtitle="¿Tienes alguna pregunta?" />

      <div className="px-4 py-5">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Contacto</h2>

        {/* Info cards */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <span className="text-2xl">📞</span>
            <div>
              <p className="text-xs text-gray-400 font-medium">Teléfono</p>
              <p className="text-sm text-gray-700 font-semibold">+34 123 456 789</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-xs text-gray-400 font-medium">Dirección</p>
              <p className="text-sm text-gray-700 font-semibold">Calle Yuhi, 12, Zaragoza</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <span className="text-2xl">🕐</span>
            <div>
              <p className="text-xs text-gray-400 font-medium">Horario</p>
              <p className="text-sm text-gray-700 font-semibold">Lun–Dom: 10:00 – 22:00</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        {sent ? (
          <div className="flex flex-col items-center py-10 gap-3 text-center">
            <span className="text-5xl">✅</span>
            <p className="font-bold text-gray-800 text-base">¡Mensaje enviado!</p>
            <p className="text-gray-400 text-sm">Te responderemos en menos de 24 horas.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-3 text-pink-500 text-sm font-semibold underline"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-400"
            />
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Mensaje"
              rows={4}
              required
              className="bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              Enviar Mensaje ✈️
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
