import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "./contactform.css";

/*
 const serviceID = 'default_service';
   const templateID = 'template_1jyyg2h';
*/
const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mfmpscg",
        "template_1jyyg2h",
        form.current,
        "WYVJMvEJlHQIHxScZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Mensaje enviado exitosamente");
        },
        (error) => {
          console.log(error.text);
          alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
        }
      );

    e.target.reset();
  };

  return (
    <>
      <form ref={form} className="contact-form" onSubmit={sendEmail}>
        <input
          className="btn-form"
          type="text"
          name="name"
          placeholder="Ingresá tu nombre *"
          title="Sólo acepta letras y espacios en blanco"
          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
          required
        />
        <input
          className="btn-form"
          type="email"
          name="email"
          placeholder="Ingresá tu email *"
          title="Email incorrecto"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />
        <textarea
          name="comments"
          cols="50"
          rows="10"
          placeholder="Dejáme tus comentarios"
          required
        />
        <input type="submit" className="btn-enviar" value="ENVIAR" />
      </form>
    </>
  );
};

export default ContactForm;
