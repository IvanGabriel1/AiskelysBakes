import React, { useState } from "react";
import "./carousel.css";

const Carousel = ({ images }) => {
  const [selectedSlide, setSelectedSlide] = useState(0); // Estado para la slide seleccionada

  // Función para cambiar la slide seleccionada
  const handleChecked = (index) => {
    setSelectedSlide(index); // Actualiza el estado al hacer click en el control
  };

  return (
    <section
      className="carousel-container"
      style={{ "--num-slides": images.length }}
    >
      <article className="carousel">
        {/* Renderiza los inputs para el control de las slides */}
        {images.map((_, index) => (
          <input
            key={`slide-${index}`}
            type="radio"
            name="slides"
            id={`slide-${index}`}
            checked={selectedSlide === index}
            onChange={() => handleChecked(index)} // Cambia la slide cuando se selecciona el control
          />
        ))}

        {/* Renderiza las imágenes dinámicamente */}
        <ul
          className="slides"
          style={{
            transform: `translateX(-${(100 / images.length) * selectedSlide}%)`,
          }}
        >
          {images.map((img, index) => (
            <li key={`slide-${index}`} className="slide">
              <img
                className="img-carousel"
                src={img}
                alt={`imagen ${index + 1} del carousel`}
              />
            </li>
          ))}
        </ul>

        {/* Renderiza los puntos de navegación dinámicamente */}
        <aside className="slides-nav">
          {images.map((_, index) => (
            <label
              key={`dot-${index}`}
              htmlFor={`slide-${index}`} // El label se asocia al input con el mismo id
              onClick={() => handleChecked(index)} // Cambia la slide al hacer click
              id={`dot-${index}`}
            />
          ))}
        </aside>
      </article>
    </section>
  );
};

export default Carousel;
