import Link from "next/link";

const BudgetListDuplicateButton = ({ project }) => {
  return (
    <div className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-primary px-5 py-1 font-bold text-integra-text hover:bg-integra-secondary">
      <Link href={`/projects/${project}/duplicate`}>Duplicar</Link>
    </div>
  );
};

export default BudgetListDuplicateButton;
