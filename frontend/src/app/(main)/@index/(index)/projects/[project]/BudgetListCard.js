"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";
import Copy from "@/components/svg/copy";
import Block from "@/components/svg/block";
import Trash from "@/components/svg/trash";

const BudgetListCard = ({ budget }) => {
  const router = useRouter();

  const deletePresupuestoHandler = async () => {
    const res = await fetch(`/api/budget`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: budget.id }),
    });
    router.refresh();
  };

  const blockPresupuestoHandler = async () => {
    const res = await fetch("/api/budget", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: budget.id }),
    });


    if (!res.ok) {
      const response = await res.json();
      alert(response.message);
    } else {
      router.refresh();
    }
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
        <Copy blocked={budget.bloqueado} />
        <Block onClick={blockPresupuestoHandler} blocked={budget.bloqueado} />
        <Trash onClick={deletePresupuestoHandler} blocked={budget.bloqueado} />
      </div>
    </>
  );
};

export default BudgetListCard;
