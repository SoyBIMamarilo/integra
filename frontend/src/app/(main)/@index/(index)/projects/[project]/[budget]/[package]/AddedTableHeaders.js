"use client";

const AddedTableHeaders = () => {
  return (
    <thead>
      <tr>
        <th className="w-[200px] rounded-tl-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Descripción
        </th>
        <th className="h-1 w-[100px] overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          $ Referente
        </th>
        <th className="h-16 w-[150px] overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Indicador
        </th>
        <th className="h-16 w-[75px] overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Cant Origen
        </th>
        <th className="h-16 w-[75px] overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Cant Destino
        </th>
        <th className="h-16 w-[100px] overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          $ Unitario
        </th>
        <th className="h-16 w-[75px] overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Ponderación
        </th>
        <th className="w-1/9 h-16 overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          $ Total
        </th>
        <th className="w-1/9 h-16 overflow-hidden rounded-tr-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
          Descripción
        </th>
      </tr>
    </thead>
  );
};

export default AddedTableHeaders;
