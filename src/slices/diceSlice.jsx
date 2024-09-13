import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dice: Array(5).fill({ value: "?", locked: false }),
};

export const diceSlice = createSlice({
  name: "dice",
  initialState,
  reducers: {
    rollDice: (state) => {
      state.dice = state.dice.map((die) =>
        die.locked
          ? die
          : { value: Math.floor(Math.random() * 6) + 1, locked: false }
      );
    },
    stopDice: (state, action) => {
      const index = action.payload;
      state.dice[index].locked = !state.dice[index].locked;
    },
  },
});

export const { rollDice, stopDice } = diceSlice.actions;
export default diceSlice.reducer;
