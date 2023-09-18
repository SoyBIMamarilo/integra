import GroupCard from "@/components/card/group-card";
import BudgetListCard from "./BudgetListCard";
import BudgetListCreateButton from "./BudgetListCreateButton";
import BudgetListDuplicateButton from "./BudgetListDuplicateButton";

const BudgetList = async ({ budgets, project }) => {
  return (
    <GroupCard title="Presupuestos" styles="min-w-[30%]">
      {budgets.map((budget) => (
        <BudgetListCard key={budget.id} budget={budget} />
      ))}
      <BudgetListCreateButton project={project} />
      <BudgetListDuplicateButton project={project} />
    </GroupCard>
  );
};

export default BudgetList;
