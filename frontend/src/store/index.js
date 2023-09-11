import { configureStore } from "@reduxjs/toolkit";

import projectSlice from "./project-slice";
import routeSlice from "./route-slice";
import loginSlice from "./login-slice";

const store = configureStore({
  reducer: { projects: projectSlice.reducer, routes: routeSlice.reducer, login:loginSlice.reducer },
});

export default store;
