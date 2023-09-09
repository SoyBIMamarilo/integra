import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
    route: [],
  },
  reducers: {
    addRoute(state, action) {
      state.route.concat(action.payload);
    },
    resetRoute(state, action) {
      state.route = action.payload;
    },
    deleteRoute(state, action) {
      state.route = [];
    },
  },
});

export const routeActions = routeSlice.actions;

export default routeSlice;
