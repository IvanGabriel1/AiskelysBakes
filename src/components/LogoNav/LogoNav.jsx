import React from "react";
import { NavLink } from "react-router-dom";
import logo2 from "../../assets/Logo-removeBg.png";
import "./logonav.css";

const LogoNav = () => {
  return (
    <div className="logo-navbar">
      <NavLink
        className={({ isActive }) =>
          isActive ? "active-link" : "disabled-link"
        }
        to="/"
      >
        <img className="logo" src={logo2} alt="logo de AiskelysBakes" />
      </NavLink>
    </div>
  );
};

export default LogoNav;
