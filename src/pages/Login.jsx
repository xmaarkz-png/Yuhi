import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import Footer from "../components/Footer";

const ACCOUNTS_KEY = "yuhi_accounts";
const ACTIVE_KEY = "yuhi_user";

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setAccounts(loadAccounts());
    const u = localStorage.getItem(ACTIVE_KEY);
    setActive(u ? JSON.parse(u)?.usuario : null);
  }, []);

  const saveAccounts = (next) => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(next));
    setAccounts(next);
  };

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    const found = accounts.find(
      (a) => a.usuario === form.usuario.trim() && a.password === form.password
    );

    if (found) {
      localStorage.setItem(ACTIVE_KEY, JSON.stringify({ usuario: found.usuario }));
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handleRegister = (e) => {
    e?.preventDefault();
    const usuario = form.usuario.trim();
    if (!usuario || !form.password.trim()) { setError("Completa todos los campos."); return; }
    
    if (accounts.some(a => a.usuario === usuario)) {
      setError("El nombre de usuario ya existe.");
      return;
    }

    const next = [{ usuario, password: form.password, createdAt: Date.now() }, ...accounts];
    saveAccounts(next);
    handleLogin(e); // Auto-login tras registro
  };

  const handleDelete = (idx) => {
    const next = accounts.filter((_, i) => i !== idx);
    saveAccounts(next);
    if (active && next.every((a) => a.usuario !== active)) {
      localStorage.removeItem(ACTIVE_KEY);
      setActive(null);
    }
  };

  const handleUseAccount = (acct) => {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify({ usuario: acct.usuario }));
    setActive(acct.usuario);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem(ACTIVE_KEY);
    setActive(null);
  };

  return (
    <div className="pb-20 min-h-screen lg:flex lg:flex-col" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-6 lg:pt-0 lg:flex-1 lg:flex lg:items-center lg:justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          {active && (
            <div className="bg-white border border-[#1C6E8C30] rounded-2xl p-4 mb-2 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#1C6E8C]">Conectado como</p>
                <p className="font-bold text-[#274156] text-lg">{active}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="text-xs font-bold px-3 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full bg-white p-6 rounded-3xl shadow-sm border border-[#F0E6EA]">
            <h3 className="font-bold text-[#274156] mb-1">Acceso a Yuhi</h3>
            <AuthInput
              name="usuario"
              value={form.usuario}
              onChange={(e) => { change(e); setError(""); }}
              placeholder="Usuario"
              autoComplete="username"
            />

            <AuthInput
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => { change(e); setError(""); }}
              placeholder="Contraseña"
              autoComplete="current-password"
            />

            {error && <p className="text-red-500 text-xs px-1">{error}</p>}

            <div className="flex gap-3">
              <AuthButton type="submit" variant="primary">Iniciar Sesión</AuthButton>
              <AuthButton type="button" variant="outline" onClick={handleRegister}>Registro</AuthButton>
            </div>
          </form>

          <div className="w-full bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #F0E6EA" }}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold" style={{ color: "#506B75" }}>Cuentas guardadas</h4>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-500">
                {accounts.length} PERFILES
              </span>
            </div>

            <div>
              {accounts.length === 0 ? (
                <p className="text-xs text-center py-4" style={{ color: "#94A3B8" }}>Registra una cuenta para verla aquí.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {accounts.map((a, i) => (
                    <div key={a.usuario + i} className="flex items-center justify-between gap-3 p-2.5 rounded-xl transition-colors hover:bg-slate-50" style={{ border: "1px solid #F1F5F9" }}>
                      <div>
                        <p className="text-sm font-bold" style={{ color: "#274156" }}>{a.usuario} {active === a.usuario && <span className="text-[10px] ml-1 text-[#1C6E8C] font-normal italic">(actual)</span>}</p>
                        <p className="text-[10px]" style={{ color: "#94A3B8" }}>Guardado el {new Date(a.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <AuthButton type="button" variant="primary" onClick={() => handleUseAccount(a)}>Usar</AuthButton>
                        <AuthButton type="button" variant="outline" onClick={() => handleDelete(i)}>Eliminar</AuthButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
