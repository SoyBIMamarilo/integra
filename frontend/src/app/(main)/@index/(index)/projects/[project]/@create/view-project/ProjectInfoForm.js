"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import ProjectInfoFormCurrent from "./ProjectInfoFormCurrent";
import Plus from "@/components/svg/plus";
import ProjectInfoFormNew from "./ProjectInfoFormNew";

export default function ProjectInfoForm({ indices, pendingIndices }) {
  const router = useRouter();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.filter((it) => it.tagName == "INPUT"));
    // const old_presupuesto_id = event.target.selection.value;
    // const version = versionRef.current.value;
    // const res = await fetch("/api/budget/duplicate", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     old_presupuesto_id,
    //     version,
    //   }),
    // });
    // router.refresh();
    // router.back();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="grid w-[70%] max-w-[70%] grid-cols-2 gap-3">
        {indices.map((ind) => (
          <ProjectInfoFormCurrent key={ind.indicador_id} index={ind} />
        ))}
        <ProjectInfoFormNew pendingIndices={pendingIndices} />
        <button type="submit" className="button-black">
          Enviar
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="button-black"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
