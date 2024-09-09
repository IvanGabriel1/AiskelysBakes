import React from "react";
import "./productitem.css";
import { Link } from "react-router-dom";

const ProductItem = ({
  id,
  categoria,
  nombre,
  img,
  precioMinorista,
  precioMayorista,
  descripcion,
}) => {
  return (
    <article className="card-product-item">
      <picture className="card-product-picture">
        <img className="card-product-picture-img" src={img} alt={nombre} />
      </picture>

      <section className="card-product-section">
        <p className="card-product-categoria">{categoria}</p>
        <p className="card-product-name">{nombre}</p>
        <p className="card-product-price">$ {precioMinorista}</p>
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
