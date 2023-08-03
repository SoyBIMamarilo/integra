import Link from "next/link";
import Copy from "../svg/copy";
import Block from "../svg/block";
import Trash from "../svg/trash";

export default function PresupuestoCard(props) {
  return (
    <Link
      href={`/proyectos/${props.presupuesto.proyecto_id}/${props.presupuesto.id}`}
      className="m-2 flex flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 hover:bg-neutral-300 "
    >
      <div className="grow"> Versión </div>
      <div className="mx-2">{props.presupuesto.version}</div>
      <Copy />
      <Block />
      <Trash />
    </Link>
  );
}
