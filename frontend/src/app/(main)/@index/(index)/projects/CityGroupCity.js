"use client";

import { useEffect, useState } from "react";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
// import { supabaseOptions } from "@/util/supabase";

const CityGroupCity = ({ city, changeHandler }) => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetch(`/api/cities-projects/${city.id}`);
      console.log(data);
      const dataProjects = await data.json();
      console.log(dataProjects);
      setProjects(dataProjects);
    };
    loadData();
  }, []);
  const clickHandler = (id) => {
    changeHandler(id);
  };
  console.log("CITY GROUP", city);
  return (
    <Accordion.Item key={city.id} value={city.id}>
      <Accordion.Header className="mx-2 flex grow border border-black px-4">
        <Accordion.Trigger className="flex grow flex-row items-center">
          <div className=" ml-1 grow text-left">{city.nombre}</div>
          <ChevronDownIcon aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="mx-2 flex flex-col gap-1 px-6">
        {projects &&
          projects.map((pr) => (
            <div key={pr.id} className="flex flex-row text-sm font-bold">
              <div className="grow">{pr.nombre}</div>
              <div
                onClick={() => clickHandler(pr.id)}
                className="px-2 hover:cursor-pointer hover:underline"
              >
                ver
              </div>
              <div className="px-2 hover:cursor-pointer hover:underline">
                ir
              </div>
            </div>
          ))}
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default CityGroupCity;
