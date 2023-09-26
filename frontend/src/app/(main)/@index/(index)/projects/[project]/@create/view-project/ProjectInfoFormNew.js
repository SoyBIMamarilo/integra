"use client";

import { useState, useRef } from "react";

import Plus from "@/components/svg/plus";

export default function ProjectInfoFormNew({ pendingIndices }) {
  const [added, setAdded] = useState([]);
  const selected = useRef();

  const addedHandler = () => {
    const id = selected.current.value;
    const array = [...pendingIndices.filter((ind) => ind.id == id)];
    console.log(...array);
    setAdded((prev) => [...prev, ...array]);
  };

  return (
    <>
      <select ref={selected}>
        <option value="default" selected="selected">
          Adiciona un Indicador
        </option>
        {pendingIndices.map((it) => (
          <option key={it.id} value={it.id}>
            {it.abreviatura}
          </option>
        ))}
      </select>
      <Plus onClick={addedHandler} />
      {added.map((ind) => (
        <>
          <div className="flex flex-col">
            <p className="text-integra-small">{ind.abreviatura}</p>
            <p className="text-integra-thin">{ind.descripcion}</p>
          </div>
          <div className="box-border flex w-full flex-row items-center justify-between pr-8">
            <input
              className="box-border w-full border-none"
              type="number"
              name={ind.id}
            ></input>
          </div>
        </>
      ))}
    </>
  );
}
