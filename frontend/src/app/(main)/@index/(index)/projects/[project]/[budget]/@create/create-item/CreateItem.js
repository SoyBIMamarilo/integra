"use client";

import { useState, useEffect } from "react";

import CreateItemSearch from "./CreateItemSearch";
import CreateItemSelected from "./CreateItemSelected";
import CreateItemFactor from "./CreateItemFactor";
import CreateItemForm from "./CreateItemForm";
import CreateItemManual from "./CreateItemManual";

const CreateItem = ({ presupuestos }) => {
  const [addedPresupuestos, setAddedPresupuestos] = useState(null);
  const [indicador, setIndicador] = useState(null);
  const [manual, setManual] = useState(true);

  const onAddHandler = (e, p) => {
    setAddedPresupuestos(p);
  };

  const changeFormHandler = (e) => {
    setManual((prevManual) => !prevManual);
  };
  // console.log(indicador);

  const content = !manual ? (
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
  ) : (
    <>
      <CreateItemManual />
    </>
  );

  const active = "bg-neutral-200 rounded-sm border border-black px-2";
  const inactive = "rounded-sm border border-black px-2";

  return (
    <>
      <div className="mb-2 flex flex-row gap-2">
        <button
          onClick={changeFormHandler}
          className={!manual ? active : inactive}
        >
          Referente
        </button>
        <button
          onClick={changeFormHandler}
          className={manual ? active : inactive}
        >
          Manual
        </button>
      </div>
      {content}
      {/* <CreateItemSearch
        presupuestos={presupuestos}
        onAddHandler={onAddHandler}
      />
      <CreateItemSelected selected={addedPresupuestos} />
      <CreateItemFactor
        selected={addedPresupuestos}
        setIndicador={setIndicador}
      />
      <CreateItemForm selected={addedPresupuestos} indicador={indicador} /> */}
    </>
  );
};

export default CreateItem;
