import Link from "next/link";

import {
  fetchBudgetProject,
  fetchProjectValues,
} from "@/app/actions/budget-actions";
import BudgetList from "./BudgetList";
import GroupCard from "@/components/card/group-card";
import Report from "./Report";

export default async function Page({ params }) {
  const budgetsData = fetchBudgetProject(params.project);
  const budgetSummaryData = fetchProjectValues(params.project);

  const [budgets, budgetSummary] = await Promise.all([
    budgetsData,
    budgetSummaryData,
  ]);

  return (
    <>
      <div className=" flex grow flex-row">
        <BudgetList budgets={budgets} project={params.project} />
        {/* <GroupCard title="Reportes" /> */}
        <Report data={budgetSummary.items} />
      </div>
    </>
  );
}
