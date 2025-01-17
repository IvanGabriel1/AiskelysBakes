import React, { useEffect, useState } from "react";
import "./navmobile.css";
import { NavLink, useLocation } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import barsSolid from "../../assets/bars-solid.svg";
import xSolid from "../../assets/xmark-solid.svg";
import NavLinks from "../NavLinks/NavLinks";
import ModalMenuMobile from "../ModalMenuMobile/ModalMenuMobile";

const NavMobile = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isOpenModalMenuMobile, openModalMenu, closeModalMenu] =
    useModal(false);
  const { pathname } = useLocation();

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      
          <svg
            fill="#c0c0c0"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 469.868 469.868"
            className="logo-svg-mobile"
          >
            <g>
              <path
                d="M428.705,53.271c-26.587-26.587-61.937-41.229-99.537-41.229c-35.151,0-68.336,12.798-94.233,36.188
		c-25.897-23.391-59.083-36.188-94.233-36.188c-37.6,0-72.95,14.642-99.537,41.229c-54.885,54.885-54.885,144.189,0,199.074
		l16.893,16.893v181.089c0,4.142,3.358,7.5,7.5,7.5h338.755c4.142,0,7.5-3.358,7.5-7.5V269.238l16.893-16.893
		C483.589,197.46,483.589,108.156,428.705,53.271z M73.057,442.827v-15h323.755v15H73.057z M418.098,241.738l-19.09,19.09
		c-1.407,1.406-2.197,3.314-2.197,5.303v146.695H73.057V266.131c0-1.989-0.79-3.897-2.197-5.303l-19.09-19.09
		c-49.036-49.036-49.036-128.824,0-177.861c23.754-23.754,55.337-36.836,88.931-36.836c31.081,0,60.435,11.206,83.466,31.694
		l-36.963,36.962c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.303-2.197
		l42.073-42.073c0.061-0.061,0.112-0.126,0.17-0.188c0.06-0.057,0.124-0.107,0.183-0.166c23.754-23.754,55.337-36.836,88.93-36.836
		c33.594,0,65.176,13.082,88.931,36.836C467.134,112.914,467.134,192.702,418.098,241.738z"
              />
              <path
                d="M374.312,258.631h-44.133l27.41-65.639c1.596-3.822-0.208-8.215-4.031-9.811s-8.215,0.209-9.811,4.031l-29.824,71.419
		h-71.488v-68.529c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v68.529h-71.488l-29.824-71.419
		c-1.596-3.823-5.989-5.625-9.811-4.031c-3.822,1.596-5.627,5.989-4.031,9.811l27.41,65.639H95.557c-4.142,0-7.5,3.358-7.5,7.5
		s3.358,7.5,7.5,7.5h278.755c4.142,0,7.5-3.358,7.5-7.5S378.454,258.631,374.312,258.631z"
              />
            </g>
          </svg>
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
