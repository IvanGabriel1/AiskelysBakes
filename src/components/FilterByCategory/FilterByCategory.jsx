import React, { useEffect } from "react";
import "./filterbycategory.css";
import { NavLink, useLocation } from "react-router-dom";

const FilterByCategory = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, window.scrollY);
  }, [location]);

  return (
    <div className="filter-by-category-container">
      <NavLink
        to={`/productos`}
        className={({ isActive }) => (isActive ? "active-option" : "option")}
      >
        Todo
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active-option" : "option")}
        to={`/productos/alfajor`}
      >
        Alfajores
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active-option" : "option")}
        to={`/productos/bombon`}
      >
        Bombones
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active-option" : "option")}
        to={`/productos/torta`}
      >
        Tortas
      </NavLink>
    </div>
  );
};

export default FilterByCategory;
