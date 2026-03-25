import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.usuario.trim() || !form.password.trim()) { setError("Completa todos los campos."); return; }
    localStorage.setItem("yuhi_user", JSON.stringify({ usuario: form.usuario }));
    navigate("/");
  };

  const handleRegister = () => {
    if (!form.usuario.trim() || !form.password.trim()) { setError("Completa todos los campos."); return; }
    localStorage.setItem("yuhi_user", JSON.stringify({ usuario: form.usuario }));
    navigate("/");
  };

  return (
    <div className="pb-20 min-h-screen lg:pb-0 lg:flex lg:flex-col" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-10 flex flex-col gap-3 lg:flex-1 lg:flex lg:items-center lg:justify-center">
        <div className="flex flex-col gap-3 w-full lg:bg-white lg:rounded-3xl lg:shadow-xl lg:px-10 lg:py-10 lg:max-w-sm">
        <input
          type="text"
          name="usuario"
          value={form.usuario}
          onChange={change}
          placeholder="Usuario"
          autoComplete="username"
          className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none"
          style={{ background: "#D0CCD0", color: "#274156" }}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={change}
          placeholder="Contraseña"
          autoComplete="current-password"
          className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none"
          style={{ background: "#D0CCD0", color: "#274156" }}
        />

        {error && <p className="text-red-500 text-xs px-1">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white hover:opacity-90 transition-opacity mt-2"
          style={{ background: "#274156" }}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={handleRegister}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: "#274156" }}
        >
          Registro
        </button>
        </div>
      </div>
    </div>
  );
}
