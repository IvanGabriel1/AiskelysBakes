import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook
import "./goCart.css";
import svgCart from "../../assets/cart2.svg";

const GoCart = () => {
  const navigate = useNavigate(); // Inicializa el hook

  const goToCart = () => {
    navigate("/carrito"); // Redirige a /cart
  };

  return (
    <button className="btn-go-cart" onClick={goToCart}>
      <img src={svgCart} alt="Ir al carrito" />
    </button>
  );
};

export default GoCart;
