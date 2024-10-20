import React, { useState } from "react";
import "./accordion.css";
const Accordion = ({ title, options, onSelectShippingCost }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (cost, zona) => {
    onSelectShippingCost(cost, zona);
    setIsOpen(false);
  };

  return (
    <div className="accordion">
      <button
        className={`accordion-button ${isOpen ? `open` : ``}`}
        onClick={toggleAccordion}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        )}
        <p>{title}</p>
      </button>

      <div className={`accordion-content ${isOpen ? `open` : ``}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className="accordion-option"
            onClick={() =>
              handleOptionClick(option.precioEnvio, option.municipio)
            }
          >
            {option.municipio} - Precio de Envío: ${option.precioEnvio}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;