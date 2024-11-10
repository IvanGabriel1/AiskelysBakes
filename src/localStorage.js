export const saveCartInLocalStorage = (state) => {
  try {
    const estadoSerializado = JSON.stringify(state.cart); // Guardar solo el estado del carrito
    localStorage.setItem("cart", estadoSerializado);
  } catch (error) {
    console.error("No se pudo guardar el estado en localStorage:", error);
  }
};

// Cargar el carrito desde localStorage
export const loadCartFromLocalStorage = () => {
  try {
    const estadoSerializado = localStorage.getItem("cart");
    if (estadoSerializado === null) {
      return { items: [] }; // Retornar un estado inicial vacío si no hay nada en localStorage
    }
    return JSON.parse(estadoSerializado);
  } catch (error) {
    console.error("No se pudo cargar el estado desde localStorage:", error);
    return { items: [] }; // En caso de error, retornar un estado inicial vacío
  }
};
