"use client";

import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import AddButton from "./AddButton";
import SeparatorComponent from "@/components/separator";
import { supabaseOptions } from "@/util/supabase";
import Available from "./Available";
import Added from "./Added";

const AddPackage = () => {
  const [projects, setProjects] = useState();
  const [addedItems, setAddedItems] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const supabase = createPagesBrowserClient(supabaseOptions);
      const { data, error } = await supabase.rpc("valor_referente");
      setProjects(data.map((item) => ({ ...item, modified: false })));
    };
    loadData();
  }, [setProjects]);

  const addItemsHandler = (changeItem) => {
    setAddedItems((prevItems) => {
      if (
        prevItems.filter((it) => it.linea_id === changeItem.linea_id).length ===
        0
      ) {
        console.log("Entered filter");
        return [
          ...prevItems,
          {
            ...changeItem,
            indicador_origen_id: null,
            indicador_destino_id: null,
            factor_ponderacion: null,
            descripcion_ajuste: null,
          },
        ];
      }
      return prevItems.filter((it) => it.linea_id != changeItem.linea_id);
    });
  };

  const changeItemHandler = (editedItem) => {
    setAddedItems((prevItems) => [
      ...prevItems.filter((it) => it.linea_id != editedItem.linea_id),
      editedItem,
    ]);
  };

  return (
    <div className="flex w-full flex-row gap-2">
      <Available projects={projects} addItemsHandler={addItemsHandler} />
      <SeparatorComponent />
      <div className="flex grow flex-col">
        <Added addedItems={addedItems} changeItemHandler={changeItemHandler} />
        {addedItems.length > 0 && <AddButton addedItems={addedItems} />}
      </div>
    </div>
  );
};

export default AddPackage;
