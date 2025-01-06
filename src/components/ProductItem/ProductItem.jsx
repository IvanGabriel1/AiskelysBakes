import { useEffect, useState } from "react";
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
  descuento,
  descuentoMayorista,
}) => {
  const [isMayorista, setIsMayorista] = useState(false);
  const nombreMayuscula = nombre.toUpperCase();
  const categoriaMinuscula = categoria.toLowerCase();

  //Definir una función selector dentro de tu slice de cart. Esto mejora la claridad y el mantenimiento:
  const cantidad = useSelector((state) => selectProductQuantity(state, id));
  //De esta forma, estás reutilizando la lógica del selector en lugar de duplicarla en varios componentes.

  useEffect(() => {
    if (categoriaMinuscula === "alfajor" && cantidad >= 12) {
      setIsMayorista(true);
    } else if (categoriaMinuscula === "bombon" && cantidad >= 36) {
      setIsMayorista(true);
    } else if (categoriaMinuscula === "torta" && cantidad >= 3) {
      setIsMayorista(true);
    } else {
      setIsMayorista(false);
    }
  }, [cantidad, categoriaMinuscula]);

  return (
    <article className="card-product-item">
      <picture className="card-product-picture">
        <img className="card-product-picture-img" src={img} alt={nombre} />
        {descuentoMayorista ? (
          <span className="card-product-picture-spanmayorista">
            Mayorista: -{descuentoMayorista}%
          </span>
        ) : (
          ""
        )}
        {descuento ? (
          <span className="card-product-picture-span">
            Minorista: -{descuento}%
          </span>
        ) : (
          ""
        )}
      </picture>

      <section className="card-product-section">
        <p className="card-product-name">{nombreMayuscula}</p>

        <div className="card-product-price-container">
          {descuento ? (
            <div className="card-product-price conDescuento">
              <b>
                Minorista: $ <s>{precioMinorista}</s> /
                {precioMinorista - precioMinorista * (descuento / 100)} usd.-
              </b>
            </div>
          ) : (
            <p className="card-product-price">
              <b>Minorista: ${precioMinorista} usd.-</b>
            </p>
          )}

          {descuentoMayorista ? (
            <div className="card-product-price conDescuento">
              <b>
                Mayorista: $ <s>{precioMayorista}</s> /
                {precioMayorista - precioMayorista * (descuentoMayorista / 100)}
                {` `} usd.-
              </b>
            </div>
          ) : (
            <p className="card-product-price">
              <b>Mayorista: ${precioMayorista} usd.-</b>
            </p>
          )}
        </div>
      </section>

      <QuantityButtons
        id={id}
        nombre={nombre}
        img={img}
        precioMinorista={precioMinorista}
        precioMayorista={precioMayorista}
        cantidad={cantidad}
        categoria={categoria}
        descuento={descuento}
        descuentoMayorista={descuentoMayorista}
      />

      {isMayorista ? (
        <span className="card-product-total">
          <strong className="card-product-total-strong-mayorista">
            Mayorista!
          </strong>
          <br />
          <span className="card-product-monto-final">
            Total: $
            {descuentoMayorista
              ? (
                  (precioMayorista -
                    precioMayorista * (descuentoMayorista / 100)) *
                  cantidad
                ).toFixed(2)
              : (precioMayorista * cantidad).toFixed(2)}
          </span>
        </span>
      ) : (
        <span className="card-product-total">
          <strong className="card-product-total-strong-minorista">
            Minorista
          </strong>
          <br />
          <span className="card-product-monto-final">
            Total: $
            {descuento
              ? (
                  (precioMinorista - precioMinorista * (descuento / 100)) *
                  cantidad
                ).toFixed(2)
              : (precioMinorista * cantidad).toFixed(2)}
          </span>
        </span>
      )}

      <footer className="card-product-footer">
        <Link to={`/item/${id}`} className="item-details-btn">
          Ver detalles
        </Link>
      </footer>
    </article>
  );
};

export default ProductItem;
