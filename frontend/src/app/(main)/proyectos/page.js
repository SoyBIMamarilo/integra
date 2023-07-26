// "use client";

import Link from "next/link";
// import { Listbox } from "@headlessui/react";
import Preloader from "./components/preloader";
import Providers from "./components/provider";

const fetchProyectos = async () => {
  const res = await fetch("http://localhost:8080/proyectos");
  const json = await res.json();
  console.log(json);
  return json;
};

export default async function Proyectos() {
  const projects = await fetchProyectos();

  return (
    <>
      <Providers>
        <Preloader projects={projects} />
      </Providers>
      <div className="mb-8 text-3xl font-semibold">
        <div>Proyectos - </div>
        {projects.map((proyecto) => (
          <Link href={`/proyectos/${proyecto.id}`}>{proyecto.nombre}</Link>
        ))}
        <div />
        {/* <Listbox value={selectedProject} onChange={setSelectedProject}>
          <Listbox.Button>Pruebaaa</Listbox.Button>
          <Listbox.Options>
            {proyectos.map((proyecto) => (
              <Listbox.Option key={proyecto.id} value={proyecto.nombre}>
                {proyecto.nombre}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox> */}
      </div>
      <Link href="/proyectos/login">Link Modal</Link>
    </>
  );
}
