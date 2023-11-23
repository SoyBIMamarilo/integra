"use client";

import AvailableItem from "./AvailableItem";

const Available = ({ projects, addItemsHandler }) => {
  // console.log("Available", projects);
  return (
    <div className="flex flex-col">
      <div>Projectos Disponibles</div>
      {projects &&
        projects.map((project) => (
          <AvailableItem
            key={project.linea_id}
            project={project}
            addItemsHandler={addItemsHandler}
          />
        ))}
    </div>
  );
};

export default Available;
