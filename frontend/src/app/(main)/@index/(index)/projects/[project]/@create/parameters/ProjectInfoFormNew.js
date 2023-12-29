"use client";

import { useState, useRef } from "react";

import Plus from "@/components/svg/plus";

export default function ProjectInfoFormNew({
  pendingIndices,
  clickHandler,
  changeHandler,
}) {
  console.log(pendingIndices);
  const selected = useRef();
  const addedHandler = () => {
    if (selected.current.value == "default") {
      return;
    }
    const id = selected.current.value;
    console.log(id);
    clickHandler(selected.current.value);
  };
  const changeInputHandler = (event) => {
    console.log(event);
    changeHandler(event.target.value, +event.target.name);
  };

  const content =
    pendingIndices.length != 0 ? (
      <>
        <select ref={selected} defaultValue="default">
          <option value="default" disabled={true}>
            Adiciona un Indicador
          </option>
          {pendingIndices
            .filter((it) => it.modify === false)
            .sort((it1, it2) =>
              it1.indicador_id < it2.indicador_id
                ? 1
                : it1.indicador_id > it2.indicador_id
                ? -1
                : 0
            )
            .map((it) => (
              <option key={it.indicador_id} value={it.indicador_id}>
                {it.abreviatura}
              </option>
            ))}
        </select>
        <Plus onClick={addedHandler} />
      </>
    ) : (
      <div className="font-bold">Sin parámetros por añadir</div>
    );
  return (
    <>
      {content}
      {pendingIndices
        .filter((it) => it.modify === true)
        .sort((it1, it2) =>
          it1.indicador_id < it2.indicador_id
            ? 1
            : it1.indicador_id > it2.indicador_id
            ? -1
            : 0
        )
        .map((ind) => (
          <>
            <div key={ind.id} className="flex flex-col">
              <p className="font-bold">{ind.abreviatura}</p>
              <p className="text-xs">{ind.descripcion}</p>
            </div>
            <div className="box-border flex w-full flex-row items-center justify-between pr-8">
              <input
                className="box-border w-full border-none"
                type="number"
                name={ind.indicador_id}
                onChange={changeInputHandler}
              ></input>
            </div>
          </>
        ))}
    </>
  );
}
