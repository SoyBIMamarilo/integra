import BudgetTable from "./BudgetTable";

import { fetchBudgetItems } from "@/app/actions/budget-actions";

export default async function Page({ params }) {
  const itemsValues = await fetchBudgetItems(params.budget);

  return (
    <BudgetTable
      budget={params.budget}
      project={params.project}
      itemsValues={itemsValues}
    />
  );
}
