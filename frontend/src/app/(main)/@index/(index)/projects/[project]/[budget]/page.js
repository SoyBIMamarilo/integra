import Table from "./components/table";

import { fetchBudgetPackage } from "@/app/actions/budget-actions";
import { fetchPaquetesTrabajo } from "@/app/actions/paquetes-actions";

export default async function Page({ params }) {
  const paquetes = await fetchBudgetPackage(params.budget);
  // const paquetes1 = await fetchPaquetesTrabajo();
  // console.log(paquetes1);
  return (
    <Table
      paquetes={paquetes}
      budget={params.budget}
      path={`/projects/${params.project}/${params.budget}`}
    />
  );
}
