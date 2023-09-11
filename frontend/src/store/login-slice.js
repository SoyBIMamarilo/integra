import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn:false
  },
  reducers: {
    setIsLoggedIn(state, action) {
        state.isLoggedIn = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;