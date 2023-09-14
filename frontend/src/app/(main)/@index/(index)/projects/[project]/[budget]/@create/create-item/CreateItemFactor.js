"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabaseOptions } from "@/util/supabase";

const CreateItemFactor = ({ selected, setIndicador }) => {
  const supabase = createClientComponentClient(supabaseOptions);
  const params = useParams();
  const selectedProject = params.project;

  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    // console.log(selectedProject);
    const fetchIndicadores = async () => {
      const { data: indicadores, error } = await supabase.rpc(
        "proyecto_indicadores_comun",
        { pr_or: selected.proyecto_id, pr_dest: selectedProject }
      );

      setIndicadores(indicadores);
    };
    if (selected) {
      fetchIndicadores();
    }
  }, [selected, selectedProject]);

  const changeSelectHandler = (e) => {
    const id = e.target.value;
    if (!id) {
      setIndicador(null);
      return;
    }
    setIndicador(indicadores.filter((indicador) => indicador.id == id)[0]);
  };
  const component = selected && (
    <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
      <div>Indicadores disponibles</div>
      <select defaultValue={null} onChange={changeSelectHandler}>
        <option value={null} />
        {indicadores.map((ind) => (
          <option key={ind.id} value={ind.id}>
            {ind.abreviatura}
          </option>
        ))}
      </select>
    </div>
  );
  return component;
};

export default CreateItemFactor;
