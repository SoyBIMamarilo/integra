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

export default async function Proyectos() {
  const projects = await fetchProyectos();

  return (
    <>
      <ReduxProvider>
        <Preloader projects={projects} />
      </ReduxProvider>
    </>
  );
}
