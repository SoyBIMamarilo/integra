"use client";

import { useState, useEffect } from "react";

import CreateItemSearch from "./CreateItemSearch";
import CreateItemSelected from "./CreateItemSelected";
import CreateItemFactor from "./CreateItemFactor";
import CreateItemForm from "./CreateItemForm";
import CreateItemManual from "./CreateItemManual";

const CreateItem = ({filterLists}) => {
  const [addedPresupuestos, setAddedPresupuestos] = useState(null);
  const [indicador, setIndicador] = useState(null);
  const [manual, setManual] = useState(false);

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
        onAddHandler={onAddHandler}
        filterLists = {filterLists}
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

  const active =
    "w-32 bg-integra-text text-integra-background-principal rounded-sm border border-black px-2 first:rounded-tl-full first:rounded-bl-full last:rounded-tr-full last:rounded-br-full ";
  const inactive =
    "w-32	 bg-integra-background text-integra-text rounded-sm border border-black px-2 first:rounded-tl-full first:rounded-bl-full last:rounded-tr-full last:rounded-br-full";

  return (
    <>
      <div className="mb-2 flex flex-row ">
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
    </>
  );
};

export default CreateItem;
