import Link from "next/link";
import Copy from "@/components/svg/copy";
import Block from "@/components/svg/block";
import Trash from "@/components/svg/trash";

const ItemListCard = ({ item }) => {
  return (
    <>
      <div className="m-2 flex flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 hover:bg-neutral-300 ">
        <Link
          href={`/past-projects/${item.proyecto_id}/${item.id}`}
          className="flex grow flex-row"
        >
          <div> Versión: </div>
          <div className="mx-2 grow">{item.version}</div>
        </Link>
        <Copy />
        <Block />
        <Trash  />
      </div>
    </>
  );
};

export default ItemListCard;
