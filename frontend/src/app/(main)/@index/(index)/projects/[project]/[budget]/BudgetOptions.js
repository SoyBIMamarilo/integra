import Link from "next/link";

const BudgetOptions = ({ project, budget }) => {
  return (
    <div className="flex flex-row gap-3">
      <Link href={`/projects/${project}/${budget}/create`}>
        <button className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-1 font-bold text-integra-text hover:bg-integra-background-strong">
          Añadir Paquete
        </button>
      </Link>
      <Link href={`/projects/${project}/${budget}/parameters`}>
        <button className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-1 font-bold text-integra-text hover:bg-integra-background-strong">
          Parámetros
        </button>
      </Link>
    </div>
  );
};
export default BudgetOptions;
