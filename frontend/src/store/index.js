import { configureStore } from "@reduxjs/toolkit";

import projectSlice from "./project-slice";
import routeSlice from "./route-slice";

const store = configureStore({
  reducer: { projects: projectSlice.reducer, routes: routeSlice.reducer },
});

export default store;
