import React from "react";
import "./productitem.css";
import { Link } from "react-router-dom";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import { useSelector } from "react-redux";
import { selectProductQuantity } from "../../redux/cartSlice";

const ProductItem = ({
  id,
  nombre,
  img,
  precioMinorista,
  precioMayorista,
  categoria,
}) => {
  const nombreMayuscula = nombre.toUpperCase();

  //Definir una función selector dentro de tu slice de cart. Esto mejora la claridad y el mantenimiento:
  const cantidad = useSelector((state) => selectProductQuantity(state, id));
  //De esta forma, estás reutilizando la lógica del selector en lugar de duplicarla en varios componentes.

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
        <p>{categoria}</p>
      </section>

      <QuantityButtons
        id={id}
        nombre={nombre}
        img={img}
        precioMinorista={precioMinorista}
        precioMayorista={precioMayorista}
        cantidad={cantidad}
        categoria={categoria}
      />
      <footer className="card-product-footer">
        <Link to={`/item/${id}`} className="item-details-btn">
          Ver detalles
        </Link>
      </footer>
    </article>
  );
};

export default ProductItem;
