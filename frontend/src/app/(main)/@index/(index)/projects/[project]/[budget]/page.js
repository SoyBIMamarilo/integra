import Table from "./components/table";

import {
  fetchBudgetItems,
  fetchBudgetPackage,
} from "@/app/actions/budget-actions";

export default async function Page({ params }) {
  const paquetes = await fetchBudgetPackage(params.budget);
  const items = await fetchBudgetItems(params.budget);
  return (
    <Table
      paquetes={paquetes}
      budget={params.budget}
      path={`/projects/${params.project}/${params.budget}`}
      items={items}
    />
  );
}
