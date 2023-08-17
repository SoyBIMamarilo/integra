import Link from "next/link";
import PresupuestoCard from "@/src/components/card/presupuestos-card";
import GroupCard from "@/src/components/card/group-card";

async function fetchPresupuestos(project) {
  const res = await fetch(`http://localhost:8080/proyectos/${project}`, {
    next: { tags: ["a"] },
  });
  const json = await res.json();

  return json;
}

export default async function Page({ params }) {
  const presupuestos = await fetchPresupuestos(params.project);
  return (
    <>
      <div className="relative grid h-[80vh] grow grid-cols-2">
        <GroupCard title="Presupuestos">
          {presupuestos.map((presupuesto) => (
            <PresupuestoCard presupuesto={presupuesto} />
          ))}
          <div className="my-5 ml-2 place-self-end	">
            <Link
              href={{
                pathname: `/projects/${params.project}/create`,
              }}
              className="button-black  "
            >
              Crear
            </Link>
          </div>
        </GroupCard>
        <GroupCard title="Reportes" />
      </div>
    </>
  );
}
