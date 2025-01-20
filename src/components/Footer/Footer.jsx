import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-p">
        2024 - <i>Aiskely`s Bakes</i>. Todos los derechos reservados.
      </p>
      <p className="footer-credits">
        Página realizada por{" "}
        <a
          href="https://www.linkedin.com/in/iv%C3%A1n-braun-a690aa17a"
          target="_blank"
          rel="noopener noreferrer"
        >
          Iván Braun
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
