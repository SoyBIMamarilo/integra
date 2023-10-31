const CreateItemSearchAvailable = ({ selectedPresupuestos, onAddHandler }) => {
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });
  return (
    <>
      {selectedPresupuestos.map((ejecutado) => (
        <div
          key={ejecutado.linea_id}
          className="m-2 rounded-md border border-solid bg-neutral-200 p-1 hover:cursor-pointer	 hover:bg-neutral-300	"
          value={ejecutado.linea_id}
          onClick={(event) => onAddHandler(event, ejecutado)}
        >
          <div className="flex flex-row">
            <div className="grow font-light">{ejecutado.descripcion}</div>
            <div>{nf.format(ejecutado.sum)}</div>
          </div>
          <div className="flex flex-row">
            <div className="grow">
              <span className="font-bold">{ejecutado.cbs}</span>
              <span>, {ejecutado.line_type}</span>
            </div>
            <div>{ejecutado.nombre}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CreateItemSearchAvailable;
