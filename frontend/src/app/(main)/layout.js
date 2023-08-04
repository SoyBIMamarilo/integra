import Link from "next/link";

import ReduxProvider from "@/src/components/provider";
import Preloader from "@/src/components/preloader";

async function fetchProyectos() {
  const res = await fetch("http://localhost:8080/proyectos", {
    cache: "no-store",
  });
  const json = await res.json();
  console.log(json);
  return json;
}

const fetchPaquetesTrabajo = async () => {
  const res = await fetch(
    "http://localhost:8080/bases-datos/paquetes-trabajo",
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
};

export default async function Layout({ index, login }) {
  const projects = await fetchProyectos();
  const paquetes = await fetchPaquetesTrabajo();

  const isLoggedIn = true;

  const indexLayout = (
    <>
      <ReduxProvider>
        <Preloader paquetes={paquetes} projects={projects} />
      </ReduxProvider>
      <div>
        <div className="sticky top-0 box-border flex h-[10vh] flex-row items-center  bg-neutral-800 text-neutral-200 ">
          <div className="basis-1/6 text-center text-3xl font-semibold">
            INTEGRA
          </div>
          <div className="p-2 text-right text-2xl">Mi Perfil</div>
        </div>
        <div className="flex flex-row">
          <div className="sticky top-[10vh] flex h-[90vh] basis-1/6 flex-col items-center gap-3 bg-neutral-200 pt-12 text-lg text-neutral-600">
            <Link href="/projects" className="hover:text-neutral-900">
              Proyectos
            </Link>
            <Link href="/reports" className="hover:text-neutral-900">
              Reportes
            </Link>
            <Link href="/data-bases" className="hover:text-neutral-900">
              Bases de Datos
            </Link>
          </div>
          <div className="row flex min-h-full basis-5/6 flex-col p-4 ">
            {index}
          </div>
        </div>
      </div>
    </>
  );

  return isLoggedIn ? indexLayout : login;
}
