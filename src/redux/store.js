import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import {
  loadCartFromLocalStorage,
  saveCartInLocalStorage,
} from "../localStorage";

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Suscribirse a los cambios del store para guardar el carrito en localStorage
store.subscribe(() => {
  saveCartInLocalStorage(store.getState());
});

export default store;
