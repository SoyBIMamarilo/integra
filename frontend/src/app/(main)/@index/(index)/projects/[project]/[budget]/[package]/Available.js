"use client";

import AvailableItem from "./AvailableItem";
import AvailableItemSearch from "./AvailableItemSearch";
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
            <AvailableItemSearch
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
