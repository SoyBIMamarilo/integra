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
      <div className="ml-2 mt-4 mb-2 flex flex-row gap-3 ">
        <BudgetListCreateButton project={project} />
        <BudgetListDuplicateButton project={project} />
      </div>
    </GroupCard>
  );
};

export default BudgetList;
