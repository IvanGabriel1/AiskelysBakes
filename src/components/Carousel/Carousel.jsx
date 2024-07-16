import React, { useState } from "react";
import "./carousel.css";
import imgCarrousel1 from "../../assets/img-carrousel-1.png";
import imgCarrousel2 from "../../assets/img-carrousel-2.png";
import imgCarrousel3 from "../../assets/img-carrousel-3.png";

const Carousel = () => {
  const [selectedSlide, setSelectedSlide] = useState("slide-1");

  const handleChecked = (e) => {
    setSelectedSlide(e.target.id);
  };

  return (
    <section className="carousel-conteiner">
      <article className="carousel">
        <input
          type="radio"
          name="slides"
          id="slide-1"
          checked={selectedSlide === "slide-1"}
          onChange={handleChecked}
        />
        <input
          type="radio"
          name="slides"
          id="slide-2"
          checked={selectedSlide === "slide-2"}
          onChange={handleChecked}
        />
        <input
          type="radio"
          name="slides"
          id="slide-3"
          checked={selectedSlide === "slide-3"}
          onChange={handleChecked}
        />
        <input
          type="radio"
          name="slides"
          id="slide-4"
          checked={selectedSlide === "slide-4"}
          onChange={handleChecked}
        />
        <ul className="slides">
          <li className="slide">
            <img
              className="img-carousel"
              src={imgCarrousel1}
              alt="imagen 1 del carousel"
            />
          </li>
          <li className="slide">
            <img
              className="img-carousel"
              src={imgCarrousel2}
              alt="imagen 2 del carousel"
            />
          </li>
          <li className="slide">
            <img
              className="img-carousel"
              src={imgCarrousel3}
              alt="imagen 3 del carousel"
            />
          </li>
          <li className="slide">
            <img
              className="img-carousel"
              src={imgCarrousel1}
              alt="imagen 4 del carousel"
            />
          </li>
        </ul>
        <aside className="slides-nav">
          <label htmlFor="slide-1" id="dot-1" />
          <label htmlFor="slide-2" id="dot-2" />
          <label htmlFor="slide-3" id="dot-3" />
          <label htmlFor="slide-4" id="dot-4" />
        </aside>
      </article>
    </section>
  );
};

export default Carousel;
