import { configureStore } from "@reduxjs/toolkit";

import { walletReducer } from "./reducers/walletReducer";

const store = configureStore({
  reducer: { wallet: walletReducer },
});

export default store;
