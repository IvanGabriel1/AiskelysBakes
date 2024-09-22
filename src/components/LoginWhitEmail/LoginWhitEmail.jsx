import { useContext } from "react";

import "./loginwhitemail.css";
import AuthContext from "../../context/AuthContext";

const LoginWhitEmail = () => {
  const {
    handleAuthentication,
    registrando,
    email,
    error,
    password,
    setEmail,
    setPassword,
    setRegistrando,
    handlePasswordReset,
  } = useContext(AuthContext);

  return (
    <form onSubmit={handleAuthentication} className="loginwhitemail-container">
      <h3>
        {registrando
          ? "Si ya tienes cuenta, haz clic en `Iniciar Sesión`"
          : "Si no tienes cuenta, haz clic en `Registrarme`"}
      </h3>
      <button type="button" onClick={() => setRegistrando(!registrando)}>
        {registrando ? "Iniciar Sesión" : "Registrarme"}
      </button>
      <h4>{registrando ? "Registrando:" : "Inicio de sesión:"}</h4>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {error.email && <span className="form-error-login">{error.email}</span>}
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error.password && (
        <span className="form-error-login">{error.password}</span>
      )}
      {error.errorContraseña && (
        <span className="form-error-login">{error.errorContraseña}</span>
      )}
      {error.errorEmailNoRegistrado && (
        <span className="form-error-login">{error.errorEmailNoRegistrado}</span>
      )}
      {error.errorVerificacion && (
        <span className="form-error-login">{error.errorVerificacion}</span>
      )}
      {error.errorGeneral && (
        <span className="form-error-login">{error.errorGeneral}</span>
      )}
      {error.errorRegex && (
        <span className="form-error-login">{error.errorRegex}</span>
      )}

      <button type="submit">{registrando ? "Registrarme" : "Ingresar"}</button>
      <h6>
        Si olvidó su contraseña ingrese su email y haga click en el siguiente
        botón para recibir un correo y reestablecer su contraseña:
      </h6>
      <button type="button" onClick={() => handlePasswordReset(email)}>
        Recuperar contraseña
      </button>
    </form>
  );
};

export default LoginWhitEmail;
