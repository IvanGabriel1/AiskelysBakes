export const saveCartInLocalStorage = (state) => {
  try {
    const estadoSerial = JSON.stringify(state);
    localStorage.setItem("cart", estadoSerial);
  } catch (error) {
    console.error("No se pudo guardar el estado en localStorage", error);
  }
};

export const loadCartFromLocalStorage = () => {
  try {
    const estadoSerial = localStorage.getItem("cart");
    if (estadoSerial === null) {
      return undefined; // Si no hay nada en localStorage, devolvemos `undefined` para usar el estado inicial
    }
    return {
      cart: JSON.parse(estadoSerial), // Asegurarnos de que el estado cargado esté bajo la clave 'cart'
    };
  } catch (error) {
    console.error("No se pudo cargar el estado desde localStorage:", error);
    return undefined;
  }
};
