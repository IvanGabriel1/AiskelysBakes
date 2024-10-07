import React from "react";
import "./navlinks.css";
import { NavLink } from "react-router-dom";
import cartSVG from "../../assets/cart.svg";
import { useSelector } from "react-redux";

const NavLinks = () => {
  const items = useSelector((state) => state.cart.items);

  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-link" : "disabled-link"
        }
        to="/"
      >
        Inicio
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? "active-link" : "disabled-link"
        }
        to="/nosotros"
      >
        Nosotros
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-link" : "disabled-link"
        }
        to="/productos"
      >
        Productos
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-link" : "disabled-link"
        }
        to="/contacto"
      >
        Contacto
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? "active-link" : "disabled-link"
        }
        to="/carrito"
      >
        <div className="carritoNavContainer">
          <img
            className="carritoEnlaceImg"
            src={cartSVG}
            alt="enlace al carrito de compras"
          />
          <span className="carritoSpan">
            {items.reduce((acumulador, item) => acumulador + item.cantidad, 0)}
          </span>
        </div>
      </NavLink>
    </>
  );
};

export default NavLinks;
