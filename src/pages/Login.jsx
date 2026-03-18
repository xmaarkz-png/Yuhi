import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ usuario: '', password: '', email: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      // Demo: accept any non-empty credentials
      if (!form.usuario.trim() || !form.password.trim()) {
        setError('Por favor completa todos los campos.');
        return;
      }
      // Save to localStorage (demo only — use proper auth in production)
      localStorage.setItem('yuhi_user', JSON.stringify({ usuario: form.usuario }));
      navigate('/');
    } else {
      if (!form.usuario.trim() || !form.email.trim() || !form.password.trim()) {
        setError('Por favor completa todos los campos.');
        return;
      }
      localStorage.setItem('yuhi_user', JSON.stringify({ usuario: form.usuario, email: form.email }));
      navigate('/');
    }
  };

  return (
    <div className="pb-20">
      <Header subtitle={mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'} />

      <div className="px-4 py-8">
        {/* Mode toggle */}
        <div className="flex rounded-2xl p-1 mb-6" style={{background:'#D0CCD0'}}>
          {['login', 'register'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-colors ${
                mode === m ? 'bg-white shadow' : 'text-gray-400'
              }`}
            >
              {m === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            placeholder="Usuario"
            autoComplete="username"
            required
            className="rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#1C6E8C]" style={{background:'#D0CCD0'}}  
          />

          {mode === 'register' && (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="email"
              required
              className="rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#1C6E8C]" style={{background:'#D0CCD0'}}
            />
          )}

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            className="rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#1C6E8C]" style={{background:'#D0CCD0'}}
          />

          {error && (
            <p className="text-red-500 text-xs bg-red-50 rounded-xl px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            className="text-white font-semibold py-3.5 rounded-2xl text-sm transition-opacity hover:opacity-90 mt-1" style={{background:'#274156'}}
          >
            {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="font-semibold" style={{color:'#FFA1C7'}}
          >
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>

        <div className="mt-6 bg-blue-50 rounded-2xl px-4 py-3 text-xs text-blue-600">
          <strong>Nota:</strong> El login es demo. Integra tu servicio de autenticación (Firebase, Auth0, etc.) antes de producción.
        </div>
      </div>
    </div>
  );
}
