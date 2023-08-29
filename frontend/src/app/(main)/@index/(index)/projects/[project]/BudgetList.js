import GroupCard from "@/components/card/group-card";
import BudgetListCard from "./BudgetListCard";
import BudgetListCreateButton from "./BudgetListCreateButton";

const BudgetList = async ({ budgets, project }) => {
  return (
    <GroupCard title="Presupuestos" styles="min-w-[30%]">
      {budgets.map((budget) => (
        <BudgetListCard budget={budget} />
      ))}
      <BudgetListCreateButton project={project} />
    </GroupCard>
  );
};

export default BudgetList;
