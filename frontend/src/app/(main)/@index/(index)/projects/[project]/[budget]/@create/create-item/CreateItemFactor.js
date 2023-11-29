"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabaseOptions } from "@/util/supabase";

const CreateItemFactor = ({ selected, setIndicador }) => {
  const params = useParams();
  const selectedProject = params.project;
  const supabase = createClientComponentClient(supabaseOptions);
  const [indicadores, setIndicadores] = useState([]);
  console.log(supabase);
  useEffect(() => {
    setIndicador(null);
    const fetchIndicadores = async () => {
      // const { data: indicadores, error } = await supabase.rpc(
      //   "proyecto_indicadores_comun",
      //   { pr_or: selected.proyecto_id, pr_dest: params.budget }
      // );

      const res = await fetch("/api/common-indexes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyecto_id: selected.proyecto_id,
          budget: params.budget,
        }),
      });
      const commonIndices = await res.json();
      console.log(commonIndices);
      setIndicadores(commonIndices);
    };
    if (selected) {
      fetchIndicadores();
    }
  }, [selected, selectedProject, params]);

  const changeSelectHandler = (e) => {
    const id = e.target.value;
    if (!id) {
      setIndicador(null);
      return;
    }
    setIndicador(indicadores.filter((indicador) => indicador.id == id)[0]);
  };
  const component = selected ? (
    <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
      <div>Indicadores disponibles</div>
      <select defaultValue={null} onChange={changeSelectHandler}>
        <option value={null}>Selecciona un indicador..</option>
        {indicadores.map((ind) => (
          <option key={ind.id} value={ind.id}>
            {ind.abreviatura}
          </option>
        ))}
      </select>
    </div>
  ) : null;
  return component;
};

export default CreateItemFactor;
