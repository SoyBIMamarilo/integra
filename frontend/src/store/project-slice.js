import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    loadedProjects: [],
    selectedProject: { nombre: "Seleccionar Proyecto" },
  },
  reducers: {
    setProjects(state, action) {
      state.loadedProjects = action.payload;
    },
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice;
