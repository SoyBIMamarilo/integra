const CiudadesCard = (props) => {
  return (
    <>
      <div className="mx-auto flex w-60 max-w-sm items-center space-x-4 border-2 border-solid border-neutral-700 p-6 hover:bg-neutral-100">
        <div class="text-lg font-medium text-black">{props.name}</div>
        {/* <p class="text-slate-500"> id: {props.id}</p> */}
      </div>
    </>
  );
};

export default CiudadesCard;
