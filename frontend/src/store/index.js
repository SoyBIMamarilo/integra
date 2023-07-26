import { configureStore } from "@reduxjs/toolkit";

import projectSlice from "./project-slice";

const store = configureStore({
  reducer: { projects: projectSlice.reducer },
});

export default store;
