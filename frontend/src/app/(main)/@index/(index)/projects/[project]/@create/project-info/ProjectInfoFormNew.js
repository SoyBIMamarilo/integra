"use client";

import { useState, useRef } from "react";

import Plus from "@/components/svg/plus";

export default function ProjectInfoFormNew({
  pendingIndices,
  clickHandler,
  changeHandler,
}) {
  const [added, setAdded] = useState([]);
  const selected = useRef();

  const addedHandler = () => {
    const id = selected.current.value;
    const array = [...pendingIndices.filter((ind) => ind.id == id)];
    // console.log(...array);
    setAdded((prev) => [...prev, ...array]);
    clickHandler(selected.current.value);
  };
  const changeInputHandler = (event) => {
    console.log(event);
    changeHandler(event.target.value, +event.target.name);
  };
  return (
    <>
      <select ref={selected}>
        {/* <option value="default" selected="selected">
          Adiciona un Indicador
        </option> */}
        {pendingIndices.map((it) => (
          <option key={it.id} value={it.id}>
            {it.abreviatura}
          </option>
        ))}
      </select>
      <Plus onClick={addedHandler} />
      {added.map((ind) => (
        <>
          <div key={ind.id} className="flex flex-col">
            <p className="text-integra-small">{ind.abreviatura}</p>
            <p className="text-integra-thin">{ind.descripcion}</p>
          </div>
          <div className="box-border flex w-full flex-row items-center justify-between pr-8">
            <input
              className="box-border w-full border-none"
              type="number"
              name={ind.id}
              onChange={changeInputHandler}
            ></input>
          </div>
        </>
      ))}
    </>
  );
}
