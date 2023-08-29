import BudgetTable from "./BudgetTable";
import {
  fetchBudgetItems,
  fetchBudgetPackage,
  fetchBudgetPackageValues,
  fetchBudgetValues,
} from "@/app/actions/budget-actions";

export default async function Page({ params }) {
  const packages = await fetchBudgetPackage(params.budget);
  const itemsValues = await fetchBudgetItems(params.budget);
  const packagesValues = await fetchBudgetPackageValues(params.budget);
  const budgetValues = await fetchBudgetValues(params.budget);

  return (
    <BudgetTable
      packages={packages}
      budget={params.budget}
      project={params.project}
      itemsValues={itemsValues}
      packagesValues={packagesValues}
      budgetValues={budgetValues}
    />
  );
}
