import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  user: JSON.parse(localStorage.getItem("account"))?.user || {},
  token: JSON.parse(localStorage.getItem("account"))?.token || "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authReducer };
