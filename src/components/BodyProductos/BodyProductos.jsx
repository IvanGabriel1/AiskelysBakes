import React from "react";
import "./bodyproductos.css";
import heroProductos from "../../assets/hero-productos.jpg";
import Productos from "../Productos/Productos";
import HeroImage from "../HeroImage/HeroImage";
import FollowUs from "../FollowUs/FollowUs";

const BodyProductos = () => {
  return (
    <>
      <HeroImage
        img={heroProductos}
        text1={"Nuestros Productos"}
        text2={"Postres de calidad"}
      />

      <div className="body-productos-container">
        <h2 className="title">Nuestros Productos</h2>
      </div>
      <Productos />
      <FollowUs />
    </>
  );
};

export default BodyProductos;
