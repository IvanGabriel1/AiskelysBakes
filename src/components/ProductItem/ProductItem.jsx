import React from "react";
import "./productitem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ id, nombre, img, precioMinorista, precioMayorista }) => {
  const nombreMayuscula = nombre.toUpperCase();

  return (
    <article className="card-product-item">
      <picture className="card-product-picture">
        <img className="card-product-picture-img" src={img} alt={nombre} />
      </picture>

      <section className="card-product-section">
        <p className="card-product-name">{nombreMayuscula}</p>
        <p className="card-product-price">
          <b>Minorista: </b>${precioMinorista} usd.-
        </p>
        <p className="card-product-price">
          <b>Mayorista: </b> ${precioMayorista} usd.-
        </p>
      </section>

      <footer className="card-product-footer">
        <Link to={`/item/${id}`} className="item-details-btn">
          Ver detalles
        </Link>
      </footer>
    </article>
  );
};

export default ProductItem;
