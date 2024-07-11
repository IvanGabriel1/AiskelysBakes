import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/Logo.png";
import logoMobile from "../../assets/Logo-mobile.png";
import barsSolid from "../../assets/bars-solid.svg";
import xSolid from "../../assets/xmark-solid.svg";
import { HashRouter, NavLink } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { useModal } from "../../hooks/useModal";
import ModalMenuMobile from "../ModalMenuMobile/ModalMenuMobile";

const NavBar = () => {
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
    <div className="navbar-container">
      <HashRouter>
        <div className="logo-navbar">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "disabled-link"
            }
            to=""
          >
            <img className="logo" src={logo} alt="logo de AiskelysBakes" />
          </NavLink>
        </div>

        <div className="navlinks-container-desktop">
          <NavLinks />
        </div>

        <section className="navbar-mobile-container">
          <div className="logo-navbar-mobile">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active-link" : "disabled-link"
              }
              to=""
              onClick={handleCloseMenu}
            >
              <img
                className="logo"
                src={logoMobile}
                alt="logo de AiskelysBakes"
              />
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
      </HashRouter>

      <hr />
    </div>
  );
};

export default NavBar;
