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
      {presupuestos.map((presupuesto) => (
        <div>{presupuesto.id}</div>
      ))}
    </>
  );
}
