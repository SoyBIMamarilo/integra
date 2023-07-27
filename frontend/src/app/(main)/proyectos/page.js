import Link from "next/link";

import Preloader from "@/src/components/preloader";
import ReduxProvider from "@/src/components/provider";

async function fetchProyectos() {
  const res = await fetch("http://localhost:8080/proyectos");
  const json = await res.json();
  console.log(json);
  return json;
}

export default async function Proyectos() {
  const projects = await fetchProyectos();

  return (
    <>
      <ReduxProvider>
        <Preloader projects={projects} />
      </ReduxProvider>
      {/* {projects.map((proyecto) => (
        <Link href={`/proyectos/${proyecto.id}`}>{proyecto.nombre}</Link>
      ))} */}
    </>
  );
}
