import "./bodycontacto.css";
import ContactoCards from "../ContactoCards/ContactoCards";
import heroContacto from "../../assets/HeroContacto.jpeg";
import HeroImage from "../HeroImage/HeroImage";
import ContactForm from "../ContactForm/ContactForm";

const BodyContacto = () => {
  return (
    <>
      <HeroImage
        img={heroContacto}
        text1={"Contactános!"}
        text2={"Estamos a disposición"}
      />

      <div className="contact-background">
        <h4 className="contact-suggestions">
          Si tienes alguna sugerencia o pregunta, no dudes en contactarnos a
          través de nuestro teléfono, email, Instagram, o simplemente completa
          el siguiente formulario y te responderemos a la brevedad.
        </h4>
        <ContactForm />
        <ContactoCards />
      </div>
    </>
  );
};

export default BodyContacto;
