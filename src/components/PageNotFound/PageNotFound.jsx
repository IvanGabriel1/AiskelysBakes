import "./pagenotfound.css";
import imgNotFound from "../../assets/PageNotFoundImg.jpeg";
import { Link } from "react-router-dom";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="pagenotfound-container">
      <article className="pagenotfound">
        <div className="error-text-404">Error 404</div>
        <div className="error-subtext-404">Page not found</div>

        <Link to="/">
          <button className="button-home">Ir al inicio</button>
        </Link>
      </article>

      <img
        src={imgNotFound}
        alt="Imagen la pagina no funciona, error 404."
        className="img404"
      />
    </div>
  );
};

export default PageNotFound;
