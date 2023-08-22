import Table from "@/components/table/table";

async function fetchPaquetes(budget) {
  const res = await fetch(`http://localhost:8080/presupuestos/${budget}`, {
    next: { tags: ["paquete"] },
  });
  const json = await res.json();
  return json;
}

export default async function Page({ params }) {
  const paquetes = await fetchPaquetes(params.budget);
  return (
    <Table
      paquetes={paquetes}
      budget={params.budget}
      path={`/projects/${params.project}/${params.budget}`}
    />
  );
}
