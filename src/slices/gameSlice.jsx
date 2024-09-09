import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    value: 3,
  },
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { decrement } = gameSlice.actions;
export default gameSlice.reducer;
