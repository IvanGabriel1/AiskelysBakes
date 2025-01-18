import React from "react";
import "./bodycontacto.css";
import ContactoCards from "../ContactoCards/ContactoCards";
import heroContacto from "../../assets/HeroContacto.jpeg";
import HeroImage from "../HeroImage/HeroImage";
import ContactForm from "../ContactForm/ContactForm";
import NavBar from "../NavBar/NavBar";

const BodyContacto = () => {
  return (
    <>
      <div className="body-contacto-container">
        <div className="body-contact-content">
          <h2 className="title title-form">FORMULARIO DE CONTACTO</h2>
          <div className="contact-background">
            <h4 className="contact-suggestions">
              Si tienes alguna sugerencia o pregunta, no dudes en contactarnos a
              través de nuestro teléfono, email, Instagram, o simplemente
              completa el siguiente formulario y te responderemos a la brevedad.
            </h4>
            <ContactForm />
            <ContactoCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyContacto;
