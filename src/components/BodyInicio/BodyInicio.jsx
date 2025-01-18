import React from "react";
import "./bodyinicio.css";
import { Link } from "react-router-dom";
import imgAlfajor1 from "../../assets/alfajores-chocolate.png";
import imgBombon from "../../assets/bombones-sinfondo.png";
import imgTorta from "../../assets/tortas-decorada.png";
import HeroImage from "../HeroImage/HeroImage";
import heroImage2 from "../../assets/hero-image2.jpg";
import FollowUs from "../FollowUs/FollowUs";

const BodyInicio = () => {
  return (
    <>
      <HeroImage
        img={heroImage2}
        text1={"Aiskely`s Bakes"}
        text2={"Horneamos Delicias"}
      />
      <section className="body-inicio-container">
        <h2 className="title">Nuestras delicias</h2>

        <div className="articles-container">
          <Link
            to={`/productos/alfajor`}
            path="/productos/alfajor"
            className="button-link"
          >
            <div className="body-producto-shade">
              <article className="body-producto-article">
                <img src={imgAlfajor1} alt="alfajores" />
                <h2>ALFAJORES</h2>
              </article>
            </div>
          </Link>

          <Link to={`/productos/bombon`} path="/" className="button-link">
            <div className="body-producto-shade">
              <article className="body-producto-article">
                <img src={imgBombon} alt="Bombones" />
                <h2>BOMBONES</h2>
              </article>
            </div>
          </Link>

          <Link to={`/productos/torta`} path="/" className="button-link">
            <div className="body-producto-shade">
              <article className="body-producto-article">
                <img src={imgTorta} alt="Tortas" />
                <h2>TORTAS</h2>
              </article>
            </div>
          </Link>
        </div>
      </section>
      <FollowUs />
    </>
  );
};

export default BodyInicio;
