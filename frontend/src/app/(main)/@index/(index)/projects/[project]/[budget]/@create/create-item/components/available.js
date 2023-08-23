const Available = ({ selectedPresupuestos, onAddHandler }) => {
  let nf = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });
  return (
    <>
      {selectedPresupuestos.map((ejecutado) => (
        <div
          key={ejecutado.linea_id}
          className="m-2 rounded-md border border-solid bg-neutral-200 p-1"
          value={ejecutado.linea_id}
          onDoubleClick={(event) => onAddHandler(event, ejecutado)}
        >
          <div className="flex flex-row">
            <div className="grow font-light">{ejecutado.descripcion}</div>
            <div>{nf.format(ejecutado.sum)}</div>
          </div>
          <div className="flex flex-row">
            <div className="grow font-bold">{ejecutado.cbs}</div>
            <div>{ejecutado.nombre}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Available;
