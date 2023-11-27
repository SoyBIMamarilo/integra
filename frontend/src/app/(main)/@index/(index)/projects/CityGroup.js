"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

import CityGroupCity from "./CityGroupCity";
import CityGroupProject from "./CityGroupProject";

const CityGroup = ({ cities }) => {
  const [project, setProject] = useState(1);
  const changeProjectHandler = (id) => {
    setProject((prevProject) => {
      if (prevProject == id) {
        return null;
      }
      return id;
    });
  };
  return (
    <div className="flex flex-row items-start">
      <Accordion.Root
        className="flex w-96 flex-col"
        type="single"
        collapsible={true}
      >
        {cities.map((city) => (
          <CityGroupCity key={city.id} city={city} />
        ))}
      </Accordion.Root>
      {project && <CityGroupProject project={project} />}
    </div>
  );
};

export default CityGroup;
