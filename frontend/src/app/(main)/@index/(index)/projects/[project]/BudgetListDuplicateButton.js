import Link from "next/link";

const BudgetListDuplicateButton = ({ project }) => {
  return (
    <div className="my-5 ml-2 place-self-end">
      <Link href={`/projects/${project}/duplicate`} className="button-black">
        Duplicar
      </Link>
    </div>
  );
};

export default BudgetListDuplicateButton;