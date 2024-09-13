import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    value: 3, // Nombre de tentatives restantes
    totalPastries: 0, // Nombre total de pâtisseries
  },
  reducers: {
    decrement: (state) => {
      state.value -= 1; // Diminue le nombre de tentatives
    },
    addPastries: (state, action) => {
      state.totalPastries += action.payload; // Ajoute des pâtisseries
    },
  },
});

export const { decrement, addPastries } = gameSlice.actions;
export default gameSlice.reducer;
