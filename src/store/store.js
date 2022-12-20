import { configureStore } from "@reduxjs/toolkit";

import { walletReducer } from "./reducers/walletReducer";
import { authReducer } from "./reducers/authReducer";

const store = configureStore({
  reducer: { wallet: walletReducer, auth: authReducer },
});

export default store;
