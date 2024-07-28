import React from "react";
import "./followus.css";
import logoInstagram from "../../assets/logo-instagram.png";
import followImg1 from "../../assets/img-follow-1.jpg";
import followImg2 from "../../assets/img-follow-2.jpg";
import followImg3 from "../../assets/img-follow-3.jpg";
import followLogo from "../../assets/Logo.png";

const FollowUs = () => {
  return (
    <section className="follow-container">
      <h2>Seguinos en instagram!</h2>

      <div className="follow-articles-container">
        <a
          className="follow-a"
          href="https://www.instagram.com/p/C4_UDbbv4d1/?img_index=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <article
            className="follow-article"
            style={{ backgroundImage: `url(${followImg1})` }}
          >
            <img src={logoInstagram} alt="logo instagram" />
          </article>
        </a>

        <a
          className="follow-a"
          href="https://www.instagram.com/p/C5uD0KcOssY/?img_index=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <article
            className="follow-article"
            style={{ backgroundImage: `url(${followImg2})` }}
          >
            <img src={logoInstagram} alt="logo instagram" />
          </article>
        </a>

        <a
          className="follow-a"
          href="https://www.instagram.com/p/C56zdDYI92C/?img_index=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <article
            className="follow-article"
            style={{ backgroundImage: `url(${followImg3})` }}
          >
            <img src={logoInstagram} alt="logo instagram" />
          </article>
        </a>
      </div>

      <a
        className="follow-a-logo"
        href="https://www.instagram.com/aiskelybakes/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="follow-logo"
          src={followLogo}
          alt="logo con navegacion al instagram"
        />
        <i>Página principal</i>
        <img
          className="follow-logo-insta"
          src={logoInstagram}
          alt="logo con navegacion al instagram"
        />
      </a>
    </section>
  );
};

export default FollowUs;
