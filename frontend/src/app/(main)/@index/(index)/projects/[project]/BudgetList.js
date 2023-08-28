import GroupCard from "@/components/card/group-card";
import BudgetListCard from "./BudgetListCard";
import BudgetListCreateButton from "./BudgetListCreateButton";

const BudgetList = ({ budgets, project }) => {
  return (
    <GroupCard title="Presupuestos">
      {budgets.map((budget) => (
        <BudgetListCard budget={budget} />
      ))}
      <BudgetListCreateButton project={project} />
    </GroupCard>
  );
};

export default BudgetList;
