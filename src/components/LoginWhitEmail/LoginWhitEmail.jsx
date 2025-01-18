import { useContext } from "react";
import React from "react";
import "./loginwhitemail.css";
import AuthContext from "../../context/AuthContext";

const LoginWhitEmail = () => {
  const {
    handleAuthentication,
    registrando,
    email,
    setTelephone,
    telephone,
    setNombre,
    nombre,
    setApellido,
    apellido,
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
      <div className="toggle-btn-container">
        <button
          type="button"
          className={`toggle-btn ${registrando ? "" : "selected"}`}
          onClick={() => setRegistrando(false)}
        >
          Ingresar
        </button>
        <button
          type="button"
          className={`toggle-btn ${registrando ? "selected" : ""}`}
          onClick={() => setRegistrando(true)}
        >
          Registrarme
        </button>
      </div>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {error.email && <span className="form-error-login">{error.email}</span>}

      {registrando ? (
        <input
          type="number"
          name="telephone"
          id="telephone"
          value={telephone}
          placeholder="Telefono"
          onChange={(e) => setTelephone(e.target.value)}
        />
      ) : null}

      {registrando
        ? error.telephone && (
            <span className="form-error-login">{error.telephone}</span>
          )
        : null}

      {registrando ? (
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
        />
      ) : null}

      {registrando
        ? error.nombre && (
            <span className="form-error-login">{error.nombre}</span>
          )
        : null}

      {registrando ? (
        <input
          type="text"
          name="apellido"
          id="apellido"
          value={apellido}
          placeholder="Apellido"
          onChange={(e) => setApellido(e.target.value)}
        />
      ) : null}

      {registrando
        ? error.apellido && (
            <span className="form-error-login">{error.apellido}</span>
          )
        : null}

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

      <button className="btn-loginwhitemail" type="submit">
        {registrando ? "Registrarme" : "Ingresar"}
      </button>

      {registrando ? null : (
        <div>
          <p className="p-recuperar">
            Ingresa tu email y haz clic para restablecer tu contraseña:
          </p>

          <button
            className="btn-loginwhitemail-recuperar"
            type="button"
            onClick={() => handlePasswordReset(email)}
          >
            Recuperar contraseña
          </button>
        </div>
      )}
    </form>
  );
};

export default LoginWhitEmail;
