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
      <Accordion.Root
        className="flex w-96 flex-col"
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
      <SeparatorComponent />
      {project && <CityGroupProject project={project} />}
    </div>
  );
};

export default CityGroup;
