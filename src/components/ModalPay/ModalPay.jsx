import React, { useContext, useState } from "react";
import "./modalpay.css";
import FormTransferencia from "../FormTransferencia/FormTransferencia";
//import AuthContext from "../../context/AuthContext";

const ModalPay = ({
  closeModal,
  sumaFinal,
  userEmailVerified,
  telefono,
  nombre,
  apellido,
}) => {
  const [optionPaySelected, setOptionSelected] = useState("transferencia");
  //const { email } = useContext(AuthContext);

  const handlePaymentMethod = (valor) => {
    setOptionSelected(valor);
  };

  return (
    <div className="modal-pay-container">
      <div className="modal-pay">
        <button
          onClick={closeModal}
          className="modal-pay-btn-close"
          aria-label="Cerrar modal"
        >
          X
        </button>

        <h2 id="modal-pay-title" className="modal-pay-title">
          Opciones de Pago
        </h2>

        <section className="modal-pay-options" id="modal-pay-description">
          <button
            className={`modal-pay-option ${
              optionPaySelected === "transferencia" ? "seleccionado" : ""
            }`}
            onClick={() => handlePaymentMethod("transferencia")}
          >
            Transferencia Bancaria
          </button>
        </section>

        {optionPaySelected === "transferencia" ? (
          <FormTransferencia
            sumaFinal={sumaFinal}
            userEmailVerified={userEmailVerified}
            telefono={telefono}
            nombre={nombre}
            apellido={apellido}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ModalPay;
