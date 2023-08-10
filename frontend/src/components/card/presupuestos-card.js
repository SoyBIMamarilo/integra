"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";
import Copy from "../svg/copy";
import Block from "../svg/block";
import Trash from "../svg/trash";

async function deletePresupuesto(version) {
  const res = await fetch(`http://localhost:8080/presupuestos/${version}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return;
}

export default async function PresupuestoCard(props) {
  const router = useRouter();

  const deletePresupuestoHandler = async () => {
    await deletePresupuesto(props.presupuesto.id);
    router.refresh();
  };

  return (
    <>
      <div className="m-2 flex flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 hover:bg-neutral-300 ">
        <Link
          href={`/projects/${props.presupuesto.proyecto_id}/${props.presupuesto.id}`}
          className="flex grow flex-row"
        >
          <div> Versión: </div>
          <div className="mx-2 grow">{props.presupuesto.version}</div>
        </Link>
        <Copy />
        <Block />
        <Trash onClick={deletePresupuestoHandler} />
      </div>
    </>
  );
}
