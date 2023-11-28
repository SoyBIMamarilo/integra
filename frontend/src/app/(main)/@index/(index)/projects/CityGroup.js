"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

import SeparatorComponent from "@/components/separator";
import CityGroupCity from "./CityGroupCity";
import CityGroupProject from "./CityGroupProject";

const CityGroup = ({ cities }) => {
  const [project, setProject] = useState(null);
  const changeProjectHandler = (id) => {
    setProject((prevProject) => {
      console.log(id);
      if (prevProject == id) {
        return null;
      }
      return id;
    });
  };
  return (
    <div className="flex h-1/2 flex-row items-start">
      <div className=" h-full w-96 overflow-y-auto">
        <Accordion.Root
          className="flex grow flex-col gap-1"
          type="single"
          collapsible={true}
        >
          {cities.map((city) => (
            <CityGroupCity
              key={city.id}
              city={city}
              changeHandler={changeProjectHandler}
            />
          ))}
        </Accordion.Root>
      </div>
      <SeparatorComponent />
      {project && <CityGroupProject project={project} />}
    </div>
  );
};

export default CityGroup;
