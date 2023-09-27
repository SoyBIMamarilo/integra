import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    loadedProjects: [],
    loadedPaquetes: [],
    selectedProject: { nombre: "Seleccionar Proyecto" },
  },
  reducers: {
    setProjects(state, action) {
      state.loadedProjects = action.payload;
    },
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
    setPaquetes(state, action) {
      state.loadedPaquetes = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice;
