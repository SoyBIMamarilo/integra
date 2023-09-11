const CreateItemSelected = ({ selected }) => {
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });
  return (
    <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
      {!selected ? (
        "Selecciona un paquete o cbs para añadir..."
      ) : (
        <>
          <div className=" font-light">{selected.descripcion}</div>
          <div>{nf.format(selected.sum)}</div>
          <div>{selected.cbs}</div>
          <div>{selected.nombre}</div>
        </>
      )}
    </div>
  );
};

export default CreateItemSelected;
