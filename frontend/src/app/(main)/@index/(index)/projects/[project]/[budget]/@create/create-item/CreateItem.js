"use client";

import { useState, useEffect } from "react";

import CreateItemSearch from "./CreateItemSearch";
import CreateItemSelected from "./CreateItemSelected";
import CreateItemFactor from "./CreateItemFactor";
import CreateItemForm from "./CreateItemForm";

const CreateItem = ({ presupuestos }) => {
  const [addedPresupuestos, setAddedPresupuestos] = useState(null);
  const [indicador, setIndicador] = useState(null);

  const onAddHandler = (e, p) => {
    setAddedPresupuestos(p);
  };

  // console.log(indicador);

  return (
    <>
      <CreateItemSearch
        presupuestos={presupuestos}
        onAddHandler={onAddHandler}
      />
      <CreateItemSelected selected={addedPresupuestos} />
      <CreateItemFactor
        selected={addedPresupuestos}
        setIndicador={setIndicador}
      />
      <CreateItemForm selected={addedPresupuestos} indicador={indicador} />
    </>
  );
};

export default CreateItem;
