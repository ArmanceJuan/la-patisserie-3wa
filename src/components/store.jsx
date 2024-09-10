import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "../slices/gameSlice.jsx";
import diceSlice from "../slices/diceSlice.jsx";
import authSlice from "../slices/authSlice.jsx";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    dice: diceSlice,
  },
});
