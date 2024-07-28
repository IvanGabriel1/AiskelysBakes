import React from "react";
import "./heroimage.css";

const HeroImage = ({ img, text1, text2 }) => {
  return (
    <div>
      <section className="hero-image-content">
        <article
          className="hero-image"
          style={{ backgroundImage: `url(${img})` }}
        >
          <aside className="hero-image-opacity">
            <h1 className="hero-image-h1">{text1}</h1>
            <h2 className="hero-image-h2">{text2}</h2>
          </aside>
        </article>
      </section>
    </div>
  );
};

export default HeroImage;
