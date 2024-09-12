import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "../slices/gameSlice.jsx";
import diceSlice from "../slices/diceSlice.jsx";
import { apiSlice } from "../slices/apiSlice.jsx";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    dice: diceSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
