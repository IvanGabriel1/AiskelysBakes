import React from "react";
import "./formtransferencia.css";
import { send } from "emailjs-com";

const FormTransferencia = ({ email }) => {
  const enviarMailFormTransferencia = () => {
    const templateParams = {
      from_name: "Aiskely`s Bakes",
      to_name: "Usuario",
      message: "correo enviado EmailJS",
      user_email: email,
    };

    send(
      "service_contact", // Service ID
      "template_1jyyg2h", // Template ID
      templateParams,
      "WYVJMvEJlHQIHxScZ" // User ID
    )
      .then((response) => {
        console.log("Correo enviado correctamente", response);
        alert("correo enviado");
        console.log("Email del contexto:", email);
      })
      .catch((error) => {
        console.log("El Correo NO pudo ser enviado", error);
        alert("Hubo un problema al enviar el correo.");
      });
  };

  return (
    <article>
      <h3>Transferencia:</h3>
      <p>
        haz click en enviar y te mandaremos un correo electronico con los datos
        bancarios para que pueda realizar la transferencia, luego nos manda el
        comprobante de trasnferencia por mail o whatsapp y coordinamos la
        entrega.
      </p>
      <button onClick={enviarMailFormTransferencia}> Enviar </button>
    </article>
  );
};

export default FormTransferencia;
