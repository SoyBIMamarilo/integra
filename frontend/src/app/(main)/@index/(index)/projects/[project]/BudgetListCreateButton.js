import Link from "next/link";

const BudgetListCreateButton = ({ project }) => {
  return (
    <div className="my-5 ml-2 place-self-end">
      <Link href={`/projects/${project}/create`} className="button-black">
        Crear
      </Link>
    </div>
  );
};

export default BudgetListCreateButton;
