import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    loadedProjects: [],
  },
  reducers: {
    setProjects(state, action) {
      state.loadedProjects = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice;
