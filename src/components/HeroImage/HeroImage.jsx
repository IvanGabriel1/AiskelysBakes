import React from "react";
import "./heroimage.css";
import heroImage from "../../assets/hero-image1.jpg";

const HeroImage = () => {
  return (
    <div>
      <section className="hero-image-content">
        <article
          className="hero-image"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <aside className="hero-image-opacity">
            <h1 className="hero-image-h1">Aiskely`s Bakes</h1>
            <h2 className="hero-image-h2">Horneamos Delicias</h2>
          </aside>
        </article>
      </section>
    </div>
  );
};

export default HeroImage;
