import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
  },
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice;
