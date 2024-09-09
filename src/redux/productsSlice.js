import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    //el action tiene el nombre de la accion. y el payload el valor que le está pegando a la data.
    fetchProducts: (state, action) => {
      return action.payload;
      // retorna los datos que vienen y están dentro del objeto action
    },
  },
});

export const { fetchProducts } = productsSlice.actions;

export default productsSlice.reducer;
