"use client";

import { useState, useEffect } from "react";

import Search from "./search";
import Selected from "./selected";
import Factors from "./factors";
import ReferenteForm from "./referente-form";

const CreateItem = ({ presupuestos }) => {
  const [addedPresupuestos, setAddedPresupuestos] = useState(null);
  const [indicador, setIndicador] = useState(null);

  const onAddHandler = (e, p) => {
    setAddedPresupuestos(p);
  };

  return (
    <>
      <Search presupuestos={presupuestos} onAddHandler={onAddHandler} />
      <Selected selected={addedPresupuestos} />
      <Factors selected={addedPresupuestos} setIndicador={setIndicador} />
      <ReferenteForm selected={addedPresupuestos} indicador={indicador} />
    </>
  );
};

export default CreateItem;
