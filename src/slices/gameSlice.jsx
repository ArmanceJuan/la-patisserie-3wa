import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    value: 3,
    totalPastries: 0,
    isGameOver: false,
  },
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    addPastries: (state, action) => {
      state.totalPastries += action.payload;
    },
    endGame: (state) => {
      state.isGameOver = true;
    },
  },
});

export const { decrement, addPastries, endGame } = gameSlice.actions;
export default gameSlice.reducer;
