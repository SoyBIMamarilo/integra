import { Prosto_One } from "next/font/google";

export default function PresupuestoCard(props) {
  return (
    <div className="m-2 flex flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 hover:bg-neutral-300 ">
      <div> Versión </div>
      <div>{props.presupuesto.version}</div>
      {/* <div>{props.presupuesto.created_at}</div> */}
    </div>
  );
}
