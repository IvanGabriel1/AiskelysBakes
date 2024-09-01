import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    //el action tiene el nombre de la accion. y el payload el valor que le está pegando a la data.
    fetchUsers: (state, action) => {
      return action.payload;
      // retorna los datos que vienen y están dentro del objeto action
    },
  },
});

export const { fetchUsers } = usersSlice.actions;

export default usersSlice.reducer;
