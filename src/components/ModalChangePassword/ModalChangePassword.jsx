import React, { useEffect, useState } from "react";
import "./modalchangepassword.css";
import { getAuth, updatePassword } from "firebase/auth";
import xSolid from "../../assets/xmark-solid.svg";
import Swal from "sweetalert2";

const ModalChangePassword = ({ isOpenModal, closeModal }) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    // Validar que el usuario esté autenticado
    if (!user) {
      setError("Usuario no autenticado. Inicia sesión de nuevo.");
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setError(null);

      // Cierra el modal personalizado
      closeModal();

      // Muestra el SweetAlert2 después de cerrar el modal
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha cambiado la contraseña",
        showConfirmButton: false,
        timer: 2000,
      });
      setNewPassword("");
      setRepeatPassword("");
    } catch (err) {
      // Verifica y muestra el error específico de Firebase
      if (err.code === "auth/requires-recent-login") {
        setError("Debes iniciar sesión de nuevo para cambiar la contraseña.");
      } else {
        setError("Error al cambiar la contraseña.");
      }
    }
  };

  return (
    <article
      className={`modal-login ${isOpenModal ? `is-open` : ``}`}
      // onClick={closeModal}
    >
      <div
        className="modal-login-container"
        // onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-login" onClick={closeModal}>
          <img src={xSolid} alt="Botón cierre modal" />
        </button>

        <h2>Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva Contraseña"
          />
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Reescriba la nueva contraseña"
          />
          <button type="submit" className="btn-change-password">
            Cambiar Contraseña
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </article>
  );
};

export default ModalChangePassword;
