import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    value: 3,
    totalPastries: 0,
  },
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    addPastries: (state, action) => {
      state.totalPastries += action.payload;
    },
  },
});

export const { decrement, addPastries } = gameSlice.actions;
export default gameSlice.reducer;
