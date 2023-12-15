"use client";

import { useEffect, useState } from "react";

import AddButton from "./AddButton";
import SeparatorComponent from "@/components/separator";
import Available from "./Available";
import Added from "./Added";

const AddPackage = () => {
  const [projects, setProjects] = useState();
  const [addedItems, setAddedItems] = useState([]);
  const [searchItems, setSearchItems] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetch(`/api/historic-budgets`);
      const dataProjects = await data.json();
      setProjects(dataProjects.map((item) => ({ ...item, modified: false })));
    };
    loadData();
  }, [setProjects]);

  const setSearchItemsHandler = (items) => {
    setSearchItems(items);
  };
  const addItemsHandler = (changeItem) => {
    setAddedItems((prevItems) => {
      if (
        prevItems.filter((it) => it.linea_id === changeItem.linea_id).length ===
        0
      ) {
        return [
          ...prevItems,
          {
            ...changeItem,
            indicador_origen_id: null,
            indicador_destino_id: null,
            factor_ponderacion: 1,
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
      <Available
        projects={projects}
        addItemsHandler={addItemsHandler}
        searchItems={searchItems}
        setSearchItemsHandler={setSearchItemsHandler}
      />
      <SeparatorComponent />
      <div className="flex max-w-full grow flex-col overflow-auto">
        <Added addedItems={addedItems} changeItemHandler={changeItemHandler} />
        {addedItems.length > 0 && <AddButton addedItems={addedItems} />}
      </div>
    </div>
  );
};

export default AddPackage;
