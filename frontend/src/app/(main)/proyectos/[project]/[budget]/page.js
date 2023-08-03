import Table from "@/src/components/table/table";

async function fetchPaquetes(budget) {
  const res = await fetch(`http://localhost:8080/presupuestos/${budget}`, {
    method: "GET",
    cache: "no-store",
  });
  const json = await res.json();
  console.log(json);
  return json;
}

export default async function Page({ params }) {
  const paquetes = await fetchPaquetes(params.budget);
  return (
    <Table
      paquetes={paquetes}
      path={`/proyectos/${params.project}/${params.budget}`}
    />
  );
}
