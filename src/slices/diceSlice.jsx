import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dice: Array(5).fill(1),
};

export const diceSlice = createSlice({
  name: "dice",
  initialState,
  reducers: {
    rollDice: (state) => {
      state.dice = state.dice.map(() => Math.floor(Math.random() * 6) + 1);
    },
  },
});

export const { rollDice, resetDice } = diceSlice.actions;
export default diceSlice.reducer;
