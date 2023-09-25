import BudgetTable from "./BudgetTable";

export default async function Page({ params }) {
  return <BudgetTable budget={params.budget} project={params.project} />;
}
