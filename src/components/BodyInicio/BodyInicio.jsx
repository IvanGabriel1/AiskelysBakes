import React from "react";
import "./bodyinicio.css";
import { Link } from "react-router-dom";
import imgAlfajor1 from "../../assets/alfajores-chocolate.png";
import imgAlfajor2 from "../../assets/alfajor-maicena-2.png";
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
      <section className="body-container">
        <h2 className="title">Nuestras delicias</h2>
        <div className="articles-container">
          <article>
            <h2>Alfajores de chocolate</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              suscipit cumque eos quia. Sequi, officia! Error ipsam hic nihil
              voluptatum quaerat minus voluptate, provident qui, veritatis,
              atque eius velit unde.
            </p>
            <Link path="/" className="button-link">
              Ver Alfajores de Chocolate
            </Link>
          </article>

          <img src={imgAlfajor1} alt="alfajores de chocolate" />

          <article>
            <h2>Alfajores de maisena</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              consectetur quibusdam velit, culpa porro eveniet quaerat quidem
              cum rem harum maiores atque, exercitationem at sit placeat fuga
              sed ipsum reprehenderit!
            </p>
            <Link path="/" className="button-link">
              Ver Alfajores de Maisena
            </Link>
          </article>
          <img src={imgAlfajor2} alt="alfajores de maisena" />
        </div>
      </section>
      <FollowUs />
    </>
  );
};

export default BodyInicio;
