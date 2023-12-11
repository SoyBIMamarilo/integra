"use client";

const AddedTableHeaders = () => {
  return (
    <thead>
      <tr>
        <th className="sticky left-0 h-16 w-1/9 rounded-tl-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">Descripción</th>
        {/* <th className="w-4"></th> */}
        <th className="h-1 w-1/9 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">$ Referente</th>
        <th className="h-16 w-1/9 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">Indicador</th>
        <th className="h-16 w-1/9 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">Cant Origen</th>
        <th className="h-16 w-1/9 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">Cant Destino</th>
        <th className="h-16 w-1/9 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">$ Unitario</th>
        <th className="h-16 w-[1/9 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">Ponderación</th>
        <th className="h-16 w-1/9 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">$ Total</th>
        <th className="h-16 w-1/9 rounded-tr-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold overflow-hidden">Descripción</th>
      </tr>
    </thead>
  );
};

export default AddedTableHeaders;
