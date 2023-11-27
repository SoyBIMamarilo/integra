"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { supabaseOptions } from "@/util/supabase";

const CityGroupCity = ({ city }) => {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const supabase = createClientComponentClient(supabaseOptions);
      const { data, error } = await supabase.rpc("proyectos_por_ciudad", {
        ciudad: city.id,
      });
      setProjects(data);
      //   setProjects(data.map((item) => ({ ...item, modified: false })));
    };
    loadData();
  }, []);

  console.log("CITY GROUP", city);
  return (
    <Accordion.Item className=" grow" key={city.id} value={city.id}>
      <Accordion.Header>
        <Accordion.Trigger className="flex grow flex-row items-center">
          <ChevronDownIcon aria-hidden />
          <div className="ml-1">{city.nombre}</div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="whitespace-nowrap pl-6">
        {projects && projects.map((pr) => <div key={pr.id}>{pr.nombre}</div>)}
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default CityGroupCity;
