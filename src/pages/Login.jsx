import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

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
    if (!form.usuario.trim() || !form.password.trim()) { setError("Completa todos los campos."); return; }
    localStorage.setItem(ACTIVE_KEY, JSON.stringify({ usuario: form.usuario }));
    navigate("/");
  };

  const handleRegister = (e) => {
    e?.preventDefault();
    if (!form.usuario.trim() || !form.password.trim()) { setError("Completa todos los campos."); return; }
    const next = [{ usuario: form.usuario.trim(), password: form.password, createdAt: Date.now() }, ...accounts];
    saveAccounts(next);
    setForm({ usuario: "", password: "" });
    setError("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.usuario.trim() || !form.password.trim()) return;
    const next = [{ usuario: form.usuario.trim(), password: form.password, createdAt: Date.now() }, ...accounts];
    saveAccounts(next);
    setForm({ usuario: "", password: "" });
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

  return (
    <div className="pb-20 min-h-screen lg:pb-0 lg:flex lg:flex-col" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-6 flex flex-col gap-4 max-w-md mx-auto">
        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full">
          <AuthInput
            name="usuario"
            value={form.usuario}
            onChange={change}
            placeholder="Usuario"
            autoComplete="username"
            label={null}
          />

          <AuthInput
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            placeholder="Contraseña"
            autoComplete="current-password"
            label={null}
          />

          {error && <p className="text-red-500 text-xs px-1">{error}</p>}

          <div className="flex gap-3">
            <AuthButton type="submit" variant="primary">Iniciar Sesión</AuthButton>
            <AuthButton type="button" variant="outline" onClick={handleRegister}>Registro</AuthButton>
          </div>
        </form>

        <div className="w-full bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #F0E6EA" }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: "#506B75" }}>Cuentas guardadas</h4>
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <div className="flex gap-2">
              <AuthInput name="usuario" value={form.usuario} onChange={change} placeholder="Usuario" />
              <AuthInput type="password" name="password" value={form.password} onChange={change} placeholder="Contraseña" />
            </div>
            <div className="flex gap-2">
              <AuthButton type="submit" variant="primary">Añadir cuenta</AuthButton>
              <AuthButton type="button" variant="outline" onClick={() => setForm({ usuario: "", password: "" })}>Limpiar</AuthButton>
            </div>
          </form>

          <div className="mt-3">
            {accounts.length === 0 ? (
              <p className="text-sm" style={{ color: "#94A3B8" }}>No hay cuentas registradas.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {accounts.map((a, i) => (
                  <div key={a.usuario + i} className="flex items-center justify-between gap-3 p-3 rounded-xl" style={{ background: "#FBFBFC", border: "1px solid #EFECEC" }}>
                    <div>
                      <p className="font-semibold" style={{ color: "#274156" }}>{a.usuario} {active === a.usuario && <span className="text-xs font-bold" style={{ color: "#1C6E8C" }}>(activo)</span>}</p>
                      <p className="text-xs" style={{ color: "#94A3B8" }}>{new Date(a.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
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
  );
}
