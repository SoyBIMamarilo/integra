"use client";

import { useState } from "react";

import { nf } from "@/util/date-format";
import Pencil from "@/components/svg/pencil";

export default function ProjectInfoFormCurrent({
  index,
  clickHandler,
  changeHandler,
}) {
  const [edit, setEdit] = useState(false);

  const editHandler = () => {
    setEdit((prevEdit) => !prevEdit);
    clickHandler(index.indicador_id);
  };

  const changeInputHandler = (event) => {
    changeHandler(event.target.value, index.indicador_id);
  };
  const content = edit ? (
    <>
      {/* <label classNamefor={index} /> */}
      <input
        className="box-border w-full border-none"
        name={index.indicador_id}
        // onChange={(event) => changeHandler(event, index.indicador_id)}
        onChange={changeInputHandler}
      ></input>
      <div className="w-min">
        <Pencil onClick={editHandler} />
      </div>
    </>
  ) : (
    <>
      <div className=" grow ">{nf.format(index.valor)}</div>
      <Pencil onClick={editHandler} />
    </>
  );
  // return <div>Prueba</div>;
  return (
    <>
      <div className="flex flex-col">
        <p className="font-bold	">{index.abreviatura}</p>
        <p className="text-xs">{index.descripcion}</p>
      </div>
      <div className="box-border flex w-full flex-row items-center justify-between pr-8">
        {content}
      </div>
    </>
  );
}
