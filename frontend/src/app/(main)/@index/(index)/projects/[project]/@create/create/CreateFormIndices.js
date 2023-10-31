"use client";

import { useState } from "react";

import { nf } from "@/util/date-format";
import Pencil from "@/components/svg/pencil";

export default function CreateFormIndices({ index }) {
  return (
    <>
      <div className="flex flex-col">
        <p className="font-bold	">{index.abreviatura}</p>
        <p className="text-xs">{index.descripcion}</p>
      </div>
      <div className="box-border flex w-full flex-row items-center justify-between pr-8">
        <div className=" grow ">{nf.format(index.valor)}</div>
      </div>
    </>
  );
}
