import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import {
  loadCartFromLocalStorage,
  saveCartInLocalStorage,
} from "../localStorage";

const preloadedState = loadCartFromLocalStorage();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartInLocalStorage(store.getState().cart);
});

export default store;
