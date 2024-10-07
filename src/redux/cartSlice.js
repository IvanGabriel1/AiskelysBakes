import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    //el action tiene el nombre de la accion. y el payload el valor que le está pegando a la data.
    agregarProducto: (state, action) => {
      const productoExistente = state.items.find(
        (item) => item.id === action.payload.id // Asegúrate de que action.payload.id tenga un valor
      );

      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        state.items.push({ ...action.payload, cantidad: 1 });
        console.log(state.items); // Para ver los productos que se están agregando
      }
    },

    quitarProducto: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);

      if (product) {
        if (product.cantidad > 1) {
          product.cantidad -= 1;
          console.log(product.cantidad);
        } else if (product.cantidad === 1) {
          console.log(product.cantidad);
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          console.log(product.cantidad);
          return;
        }
      }
    },

    retirarItemCarrito: (state, action) => {
      const productoAQuitar = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (productoAQuitar) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        productoAQuitar.cantidad = 0;
      }
    },
  },
});

export const selectProductQuantity = (state, productId) => {
  const productInCart = state.cart.items.find((item) => item.id === productId);
  return productInCart ? productInCart.cantidad : 0;
};

export const { agregarProducto, quitarProducto, retirarItemCarrito } =
  cartSlice.actions;

export default cartSlice.reducer;
