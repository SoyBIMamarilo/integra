"use client";

import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import SeparatorComponent from "@/components/separator";
import { supabaseOptions } from "@/util/supabase";
import Available from "./Available";
import Added from "./Added";

const AddPackage = () => {
  const [projects, setProjects] = useState();
  const [addedItems, setAddedItems] = useState([]);
  //   console.log("AddPackage", addedItems);
  //   console.log("Package page.js", projects);
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
      //   console.log("Package Page AddedItems", prevItems);
      //   console.log("Package Page ChangeItem", changeItem);
      if (
        prevItems.filter((it) => it.linea_id === changeItem.linea_id).length ===
        0
      ) {
        console.log("Entered filter");
        return prevItems.filter((it) => it.linea_id != changeItem.linea_id);
      }
      console.log([...prevItems, ...changeItem]);
      return [...prevItems, ...changeItem];
    });
  };
  return (
    <div className="flex flex-row gap-2">
      <Available projects={projects} addItemsHandler={addItemsHandler} />
      <SeparatorComponent />
      <Added addedItems={addedItems} />
    </div>
  );
};

export default AddPackage;
