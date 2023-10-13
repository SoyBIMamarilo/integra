import ItemsList from "./ItemsList";

export default async function Page({ params }) {
  return (
    <>
      <div className=" flex grow flex-row">
        <ItemsList project={params.project}/>
      </div>
    </>
  );
}
