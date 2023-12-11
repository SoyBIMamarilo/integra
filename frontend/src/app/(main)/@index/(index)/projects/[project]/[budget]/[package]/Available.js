"use client";

import AvailableItem from "./AvailableItem";
import Search from "./Search";

const Available = ({
  projects,
  addItemsHandler,
  searchItems,
  setSearchItemsHandler,
}) => {
  return (
    <div className="flex w-[30%] flex-col">
      <div className="mb-3">Projectos Disponibles</div>
      <Search setSearchItemsHandler={setSearchItemsHandler} />
      {searchItems && <div>Test</div>}
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
