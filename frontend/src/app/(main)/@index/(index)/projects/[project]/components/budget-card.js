"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";
import Copy from "@/components/svg/copy";
import Block from "@/components/svg/block";
import Trash from "@/components/svg/trash";

import { deleteBudget } from "@/app/actions/budget-actions";

const BudgetCard = ({ budget }) => {
  console.log(budget);
  const router = useRouter();

  const deletePresupuestoHandler = async () => {
    await deleteBudget(budget.id);
    router.refresh();
  };

  return (
    <>
      <div className="m-2 flex flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 hover:bg-neutral-300 ">
        <Link
          href={`/projects/${budget.proyecto_id}/${budget.id}`}
          className="flex grow flex-row"
        >
          <div> Versión: </div>
          <div className="mx-2 grow">{budget.version}</div>
        </Link>
        <Copy />
        <Block />
        <Trash onClick={deletePresupuestoHandler} />
      </div>
    </>
  );
};

export default BudgetCard;
