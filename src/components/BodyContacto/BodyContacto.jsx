import "./bodycontacto.css";
import ContactoCards from "../ContactoCards/ContactoCards";
import heroContacto from "../../assets/HeroContacto.jpeg";
import HeroImage from "../HeroImage/HeroImage";
import ContactForm from "../ContactForm/ContactForm";

const BodyContacto = () => {
  return (
    <div>
      <HeroImage
        img={heroContacto}
        text1={"Contactános!"}
        text2={"Estamos a disposición"}
      />

      <div className="contact-background">
        <ContactForm />
        <ContactoCards />
      </div>
    </div>
  );
};

export default BodyContacto;
