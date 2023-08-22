"use server";

export async function fetchProyectos() {
  const res = await fetch("http://localhost:8080/proyectos");
  if (!res.ok) {
    throw new Error("Error al obtener proyectos");
  }
  const json = await res.json();

  console.log(json);
  return json;
}
