const CiudadesCard = (props) => {
  return (
    <>
      <div className="p-6 w-60 max-w-sm mx-auto border-solid border-2 border-neutral-700 flex items-center space-x-4 hover:bg-neutral-100">
        <div class="text-lg font-medium text-black">{props.name}</div>
        {/* <p class="text-slate-500"> id: {props.id}</p> */}
      </div>
    </>
  );
};

export default CiudadesCard;
