import React, { useEffect, useState } from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { retirarItemCarrito } from "../../redux/cartSlice";
import Swal from "sweetalert2";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import { Link } from "react-router-dom";
import Accordion from "../Accordion/Accordion";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isMayorista, setIsMayorista] = useState(false);
  const [zonasData, setZonasData] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [zonaShippingCost, setZonaShippingCost] = useState("");

  useEffect(() => {
    if (items.length > 0) {
      // Actualiza el estado de isMayorista según la categoría y cantidad del primer producto como ejemplo
      const firstProduct = items[0];
      const categoria = firstProduct.categoria.toLowerCase();
      const cantidadProducto = firstProduct.cantidad;

      if (categoria === "alfajor" && cantidadProducto >= 12) {
        setIsMayorista(true);
      } else if (categoria === "bombon" && cantidadProducto >= 36) {
        setIsMayorista(true);
      } else if (categoria === "torta" && cantidadProducto >= 3) {
        setIsMayorista(true);
      } else {
        setIsMayorista(false);
      }
    }
  }, [items]);

  useEffect(() => {
    fetch(`/zonasEnvios.json`)
      .then((response) => response.json())
      .then((data) => setZonasData(Object.values(data.municipios)))
      .catch((error) => console.error("Error al cargar zonas:", error));
    console.log(zonasData);
  }, []);

  const calcularSubtotal = () => {
    return items.reduce((acc, product) => {
      const isMayorista =
        (product.categoria.toLowerCase() === "alfajor" &&
          product.cantidad >= 12) ||
        (product.categoria.toLowerCase() === "bombon" &&
          product.cantidad >= 36) ||
        (product.categoria.toLowerCase() === "torta" && product.cantidad >= 3);

      const sumaTotal = isMayorista
        ? product.precioMayorista * product.cantidad
        : product.precioMinorista * product.cantidad;

      return acc + sumaTotal;
    }, 0);
  };

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

  const handleSelectShippingCost = (cost, zona) => {
    setShippingCost(cost);
    setZonaShippingCost(zona);
  };

  const sumaFinal = calcularSubtotal() + shippingCost;

  return (
    <div className="cart-component-container">
      <h2 className="title">Carrito de compras</h2>
      {items.length === 0 ? (
        <article>
          <h2>No tienes productos en el carrito</h2>
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
            {items.map((product) => {
              const categoriaMinuscula = product.categoria.toLowerCase();
              const isMayorista =
                (categoriaMinuscula === "alfajor" && product.cantidad >= 12) ||
                (categoriaMinuscula === "bombon" && product.cantidad >= 36) ||
                (categoriaMinuscula === "torta" && product.cantidad >= 3);

              const cantidadPorCategoria =
                categoriaMinuscula === "alfajor"
                  ? "Precio mayorista a partir de 12 unidades"
                  : categoriaMinuscula === "bombon"
                  ? "Precio mayorista a partir de 36 unidades"
                  : categoriaMinuscula === "torta"
                  ? "Precio mayorista a partir de 3 unidades"
                  : "Sin precio por mayorista";

              return (
                <li className="cart-item" key={product.id}>
                  <div className="cart-item-container">
                    <span className="cart-product-nombre">
                      {product.nombre}
                    </span>
                    <img
                      className="card-product-picture-img"
                      src={product.img}
                      alt={product.nombre}
                    />
                    <Link
                      to={`/item/${product.id}`}
                      className="item-details-btn"
                    >
                      Ver detalles
                    </Link>
                    <p className="cart-cantidad-por-categoria">
                      {cantidadPorCategoria}
                    </p>

                    <div className="cart-product-quantity">
                      <p>Precio Minorista: ${product.precioMinorista}</p>

                      <p>Precio Mayorista: ${product.precioMayorista}</p>

                      <QuantityButtons
                        id={product.id}
                        nombre={product.nombre}
                        precioMinorista={product.precioMinorista}
                        precioMayorista={product.precioMayorista}
                        cantidad={product.cantidad}
                        img={product.img}
                        categoria={product.categoria}
                      />

                      <span className="cart-item-total">
                        <strong>Total: </strong>$
                        {isMayorista
                          ? (
                              product.precioMayorista * product.cantidad
                            ).toFixed(2)
                          : (
                              product.precioMinorista * product.cantidad
                            ).toFixed(2)}
                      </span>
                    </div>

                    <button
                      className="cart-delete-btn"
                      onClick={() => handleSacarItem(product.id)}
                    >
                      X
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <section className="cart-summary">
            <h3>Totales del carrito</h3>
            <span className="cart-summary-subtotal">
              Subtotal: ${calcularSubtotal().toFixed(2)}
            </span>
            <p className="cart-summary-p-envio">Calcular el costo de envio:</p>
            <Accordion
              title="Seleccione una zona"
              options={zonasData}
              onSelectShippingCost={handleSelectShippingCost}
            />
            {zonaShippingCost ? (
              <p className="cart-summary-confirm-shipping">
                {zonaShippingCost} - $ {shippingCost}
              </p>
            ) : null}
            <span className="cart-summary-total">Total: ${sumaFinal}</span>
          </section>
        </section>
      )}
    </div>
  );
};

export default Cart;
