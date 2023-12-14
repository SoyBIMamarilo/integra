"use client";

import AvailableItem from "./AvailableItem";
import AvailableSearchItem from "./AvailableSearchItem";
import AvailableSearch from "./AvailableSearch";

const Available = ({
  projects,
  addItemsHandler,
  searchItems,
  setSearchItemsHandler,
}) => {
  return (
    <div className="flex w-[30%] flex-col">
      <div className="mb-3">Projectos Disponibles</div>
      <AvailableSearch setSearchItemsHandler={setSearchItemsHandler} />
      {!searchItems &&
        projects &&
        projects.map((project) => (
          <AvailableItem
            key={project.linea_id}
            project={project}
            addItemsHandler={addItemsHandler}
          />
        ))}
      {searchItems &&
        searchItems
          .filter((pr) => pr.parent_id == null)
          .map((project) => (
            <AvailableSearchItem
              key={project.linea_id}
              project={project}
              addItemsHandler={addItemsHandler}
              itemList={searchItems}
            />
          ))}
    </div>
  );
};

export default Available;
