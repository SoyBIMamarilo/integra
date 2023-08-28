import Link from "next/link";

import { fetchBudgetProject } from "@/app/actions/budget-actions";
import BudgetList from "./BudgetList";
import GroupCard from "@/components/card/group-card";

export default async function Page({ params }) {
  const budgets = await fetchBudgetProject(params.project);
  return (
    <>
      <div className="relative grid grow grid-cols-2">
        <BudgetList budgets={budgets} project={params.project} />
        <GroupCard title="Reportes" />
      </div>
    </>
  );
}
