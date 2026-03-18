import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

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
    <div className="pb-20 min-h-screen" style={{ background: "#FBFCFF" }}>
      <Header />

      <div className="px-4 pt-10 flex flex-col gap-3">
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

        <AuthButton type="button" onClick={handleLogin} variant="primary">
          Iniciar Sesión
        </AuthButton>

        <AuthButton type="button" onClick={handleRegister} variant="outline">
          Registro
        </AuthButton>
      </div>
    </div>
  );
}
