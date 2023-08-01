import Link from "next/link";
import PresupuestoCard from "@/src/components/card/presupuestos-card";
import GroupCard from "@/src/components/card/group-card";

async function fetchPresupuestos(project) {
  console.log(project);
  const res = await fetch(`http://localhost:8080/proyectos/${project}`, {
    method: "GET",
  });
  const json = await res.json();
  console.log(json);
  return json;
}

export default async function Page({ params }) {
  console.log(params.project);
  const presupuestos = await fetchPresupuestos(params.project);

  return (
    <>
      <div className="grid grow grid-cols-2">
        <GroupCard title="Presupuestos">
          {presupuestos.map((presupuesto) => (
            <PresupuestoCard presupuesto={presupuesto} />
          ))}
          <Link
            href={{
              pathname: `/proyectos/${params.project}/create`,
              query: {
                // title: "Crear_Versión",
                // inputs: { version: { name: "Versión", type: "number" } },
                // fetchUrl: ``,
              },
            }}
            className="absolute bottom-8 right-10 rounded-sm border border-solid border-black  bg-black px-8 py-2 text-center text-lg font-normal text-white"
          >
            Crear
          </Link>
        </GroupCard>
        <GroupCard title="Reportes">
          <div>Cantidad</div>
          <div>Fechas</div>
          <div>Costo</div>
        </GroupCard>
      </div>
    </>
  );
}
