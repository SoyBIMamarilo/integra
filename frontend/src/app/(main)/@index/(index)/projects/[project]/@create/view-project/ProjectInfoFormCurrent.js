"use client";

import { useState } from "react";

import { nf } from "@/util/date-format";
import Pencil from "@/components/svg/pencil";

export default function ProjectInfoFormCurrent({ index }) {
  const [edit, setEdit] = useState(false);

  const editHandler = () => {
    setEdit((prevEdit) => !prevEdit);
  };
  const content = edit ? (
    <>
      <label classNamefor={index} />
      <input
        className="box-border w-full border-none"
        // type="number"
        name={index.indicador_id}
      ></input>
      <div className="w-min">
        <Pencil onClick={editHandler} />
      </div>
    </>
  ) : (
    <>
      <div className="text-integra-small grow ">{nf.format(index.valor)}</div>
      <Pencil onClick={editHandler} />
    </>
  );

  return (
    <>
      <div className="flex flex-col">
        <p className="text-integra-small">{index.abreviatura}</p>
        <p className="text-integra-thin">{index.descripcion}</p>
      </div>
      <div className="box-border flex w-full flex-row items-center justify-between pr-8">
        {content}
      </div>
    </>
  );
}
