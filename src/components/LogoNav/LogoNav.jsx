import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
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
        <img className="logo" src={logo} alt="logo de AiskelysBakes" />
      </NavLink>
    </div>
  );
};

export default LogoNav;
