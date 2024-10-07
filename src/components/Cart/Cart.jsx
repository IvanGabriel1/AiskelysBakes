import React from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { retirarItemCarrito } from "../../redux/cartSlice";
import Swal from "sweetalert2";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleSacarItem = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se eliminará el producto del carrito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(retirarItemCarrito({ id }));
      }
    });
  };

  return (
    <div className="cart-component-container">
      <h2 className="title">Carrito de compras</h2>
      {items.length === 0 ? (
        <article>
          <h2> No tienes productos en el carrito</h2>
          <Link
            to={"/productos"}
            className="cart-btn-link-productos"
            aria-label="Ver la lista completa de productos"
          >
            Ver Productos
          </Link>
        </article>
      ) : (
        <section className="cart-container">
          <ul className="cart-ul">
            {items.map((product) => (
              <li className="cart-item" key={product.id}>
                <img
                  className="card-product-picture-img"
                  src={product.img}
                  alt={product.nombre}
                />
                <span>{product.nombre}</span>

                <span>{product.precioMinorista}</span>
                <br />
                <span>{product.precioMayorista}</span>
                <br />

                <span>---{product.categoria}---</span>
                <QuantityButtons
                  id={product.id}
                  nombre={product.nombre}
                  precioMinorista={product.precioMinorista}
                  precioMayorista={product.precioMayorista}
                  cantidad={product.cantidad}
                  img={product.img}
                  categoria={product.categoria}
                />
                <Link to={`/item/${product.id}`} className="item-details-btn">
                  Ver detalles
                </Link>

                <button onClick={() => handleSacarItem(product.id)}>X</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="cart-summary"></section>
    </div>
  );
};

export default Cart;
