import React from "react";
import "./modalmenumobile.css";

const ModalMenuMobile = ({ children, isOpenModal, closeModal }) => {
  return (
    <article
      className={`modal ${isOpenModal ? `is-open` : ``}`}
      onClick={closeModal}
    >
      <div className="modal-container">{children}</div>
    </article>
  );
};

export default ModalMenuMobile;
