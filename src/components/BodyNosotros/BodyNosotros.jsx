import React from "react";
import "./bodynosotros.css";
import heroNosotros from "../../assets/hero-nosotros.jpeg";
import HeroImage from "../HeroImage/HeroImage";
import imgMision from "../../assets/MisionNosotrosImg.jpeg";
import imgNosotros from "../../assets/Nosotros-Img.jpeg";
import imgValores from "../../assets/ValoresNosotrosImg.jpeg";
import FollowUs from "../FollowUs/FollowUs";

const BodyNosotros = () => {
  return (
    <>
      <HeroImage
        img={heroNosotros}
        text1={"Nosotros"}
        text2={"Cocina casera y familiar!"}
      />

      <div className="body-nosotros-container">
        <h2 className="title">Conocénos!</h2>
        <div className="articles-nosotros-container">
          <article>
            <h2>Historia</h2>
            <p>
              Aiskely`s Bakes nació en 2020 como un negocio familiar con el
              sueño de ofrecer productos de calidad. Con esfuerzo y dedicación,
              creamos un espacio donde la pasión y el compromiso se reflejan en
              cada detalle. ¡Conócenos y sé parte de nuestra historia
            </p>
          </article>
          <img src={imgNosotros} alt="Imagen sobre nosotros" />

          <article>
            <h2>Misión</h2>
            <p>
              Nuestra misión es ofrecer comida casera de calidad, preparada con
              ingredientes frescos y mucho amor. Queremos que cada bocado te
              haga sentir como en casa, brindando sabor, tradición y un servicio
              cálido para nuestros clientes.
            </p>
          </article>

          <img src={imgMision} alt="Imagen nuestra mision" />

          <article>
            <h2>Valores</h2>
            <p>
              Nos guiamos por valores como la calidad, la honestidad y el
              compromiso. Creemos en la importancia de la comida casera hecha
              con pasión, el trato cercano con nuestros clientes y el esfuerzo
              diario para ofrecer lo mejor en cada plato.
            </p>
          </article>

          <img src={imgValores} alt="Imagen nuestra mision" />
        </div>
        <FollowUs />
      </div>
    </>
  );
};

export default BodyNosotros;
