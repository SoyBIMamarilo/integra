import Link from "next/link";

const ItemListCreateButton = ({ project }) => {
  return (
    <div className="my-5 ml-2 place-self-end">
      <Link href={`/historic-items/${project}/batch-items`} className="button-black">
        Crear
      </Link>
    </div>
  );
};

export default ItemListCreateButton;