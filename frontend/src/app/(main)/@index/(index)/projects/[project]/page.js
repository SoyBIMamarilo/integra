import Link from "next/link";
import GroupCard from "@/components/card/group-card";

import BudgetCard from "./components/budget-card";
import { fetchBudgetProject } from "@/app/actions/budget-actions";

export default async function Page({ params }) {
  const budgets = await fetchBudgetProject(params.project);
  return (
    <>
      <div className="relative grid grow grid-cols-2">
        <GroupCard title="Presupuestos">
          {budgets.map((budget) => (
            <BudgetCard budget={budget} />
          ))}
          <div className="my-5 ml-2 place-self-end">
            <Link
              href={{
                pathname: `/projects/${params.project}/create`,
              }}
              className="button-black"
            >
              Crear
            </Link>
          </div>
        </GroupCard>
        <GroupCard title="Reportes" />
      </div>
    </>
  );
}
