import React, { useState } from "react";
import "./navmobile.css";
import { NavLink } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import logoMobile from "../../assets/Logo-mobile.png";
import barsSolid from "../../assets/bars-solid.svg";
import xSolid from "../../assets/xmark-solid.svg";
import NavLinks from "../NavLinks/NavLinks";
import ModalMenuMobile from "../ModalMenuMobile/ModalMenuMobile";

const NavMobile = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isOpenModalMenuMobile, openModalMenu, closeModalMenu] =
    useModal(false);

  const handleMenu = () => {
    if (menuActive) {
      setMenuActive(false);
      closeModalMenu();
    } else {
      setMenuActive(true);
      openModalMenu();
    }
  };

  const handleCloseMenu = () => {
    setMenuActive(false), closeModalMenu();
  };

  return (
    <section className="navbar-mobile-container">
      <div className="logo-navbar-mobile">
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "disabled-link"
          }
          to=""
          onClick={handleCloseMenu}
        >
          <img className="logo" src={logoMobile} alt="logo de AiskelysBakes" />
        </NavLink>
      </div>

      <div className="btn-menu-container">
        <button
          onClick={handleMenu}
          aria-label={menuActive ? "Cerrar menú" : "Abrir menú"}
        >
          <img
            className="navbar-hamburguer"
            src={menuActive ? xSolid : barsSolid}
            alt={menuActive ? "Cerrar menú" : "Abrir menú"}
          />
        </button>
      </div>

      <ModalMenuMobile
        isOpenModal={isOpenModalMenuMobile}
        closeModal={handleCloseMenu}
      >
        <NavLinks />
      </ModalMenuMobile>
    </section>
  );
};

export default NavMobile;
