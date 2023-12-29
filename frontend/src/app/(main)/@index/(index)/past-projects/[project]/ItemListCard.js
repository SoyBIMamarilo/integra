"use client";
import Link from "next/link";
import Copy from "@/components/svg/copy";
import Block from "@/components/svg/block";
import Trash from "@/components/svg/trash";
import { useRouter } from "next/navigation";

const ItemListCard = ({ item }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch("/api/temp", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    if (!res.ok) {
      const messageRes = await res.json();
      alert(
        `No se ha podido borrar la plantilla ya que se presenta el siguiente error: ${messageRes.message}`
      );
    } else {
      console.log(res);
      router.refresh();
    }
  };
  return (
    <>
      <div className="m-2 flex flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 hover:bg-neutral-300 ">
        <Link
          href={`/past-projects/${item.proyecto_id}/${item.id}`}
          className="flex grow flex-row"
        >
          <div> Versión: </div>
          <div className="ml-2 mr-8 grow">{item.version}</div>
          <div className="mr-2 grow">Fecha:</div>
          <div className="mr-2 grow">
            {item.fecha_ejecucion || "aaaa-mm-dd"}
          </div>
        </Link>
        <Copy />
        <Trash onClick={handleDelete} />
      </div>
    </>
  );
};

export default ItemListCard;
