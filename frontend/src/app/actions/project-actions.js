"use server";

export const fetchProjects = async () => {
  const res = await fetch("http://localhost:8080/proyectos");
  if (!res.ok) {
    throw new Error("Error al obtener proyectos");
  }
  const json = await res.json();

  return json;
};

export const fetchProject = async (projectId) => {
  const res = await fetch(`http://localhost:8080/proyectos/${projectId}`);
  if (!res.ok) {
    throw new Error("Error al obtener proyecto");
  }
  const json = await res.json();
  return json;
};
