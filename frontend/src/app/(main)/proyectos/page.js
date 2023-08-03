import Preloader from "@/src/components/preloader";
import ReduxProvider from "@/src/components/provider";

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

export default async function Proyectos() {
  const projects = await fetchProyectos();
  const paquetes = await fetchPaquetesTrabajo();

  return (
    <>
      <ReduxProvider>
        <Preloader paquetes={paquetes} projects={projects} />
      </ReduxProvider>
    </>
  );
}
