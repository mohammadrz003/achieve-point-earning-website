import { createSlice } from "@reduxjs/toolkit";

const initialWalletState = {
  walletAddress: "",
  walletBalance: "",
};

const walletSlice = createSlice({
  name: "walletSlice",
  initialState: initialWalletState,
  reducers: {
    setAccountAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setWalletBalance: (state, action) => {
      state.walletBalance = action.payload;
    },
  },
});

export const walletActions = walletSlice.actions;
const walletReducer = walletSlice.reducer;

export { walletReducer };
