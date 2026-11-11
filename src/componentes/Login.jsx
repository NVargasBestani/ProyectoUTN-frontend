import { useState } from "react";
import "./Login.css";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, contrasena: contrasena }),
    })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Email o Contrasena incorrectos");
        return respuesta.json();
      })
      .then((datos) => {
        const tokenReal = datos.access_token || datos.token;
        if (!tokenReal) throw new Error("El backend no envio el token");

        setToken(tokenReal);
        localStorage.setItem("token", tokenReal);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login-box">
      <h2 className="login-titulo">Ingreso</h2>
      <form onSubmit={manejarSubmit}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-form"
        />
        <input
          type="password"
          placeholder="Tu contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="input-form"
        />
        <button type="submit" className="btn-primario">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
