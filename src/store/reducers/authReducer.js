import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authReducer };
