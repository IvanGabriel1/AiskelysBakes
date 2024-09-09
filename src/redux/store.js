import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    data: {
      users: productsReducer,
    },
  },
});

export default store;
