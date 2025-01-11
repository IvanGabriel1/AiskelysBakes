import React, { useContext } from "react";
import "./modaluserlogin.css";
import xSolid from "../../assets/xmark-solid.svg";
import LoginWhitEmail from "../LoginWhitEmail/LoginWhitEmail";
import AuthContext from "../../context/AuthContext";

const ModalUserLogin = () => {
  const { closeModalAuthFn, closeModalAuthState } = useContext(AuthContext);

  const handleModalClick = (e) => {
    e.stopPropagation(); // Detiene la propagación del evento para que no se cierre el modal
  };

  return (
    <article
      className={`modal-login ${closeModalAuthState ? `is-open` : ``}`}
      onClick={closeModalAuthFn}
    >
      <div className="modal-login-container" onClick={handleModalClick}>
        <button className="close-modal-login" onClick={closeModalAuthFn}>
          <img src={xSolid} alt="Botón cierre modal" />
        </button>
        <LoginWhitEmail />
      </div>
    </article>
  );
};

export default ModalUserLogin;
