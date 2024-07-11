import React from "react";
import "./navlinks.css";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
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
    </>
  );
};

export default NavLinks;
