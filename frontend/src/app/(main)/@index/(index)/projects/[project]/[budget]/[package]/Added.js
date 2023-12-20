"use client";

import TreeArrow from "@/components/svg/treeArrow";
import AddedTableHeaders from "./AddedTableHeaders";
import AddedTaleItem from "./AddedTableItem";

const Added = ({ addedItems, changeItemHandler }) => {
  console.log("AddedItems", addedItems);
  return (
    <div className="flex w-full flex-col overflow-x-auto">
      <div>Añadir Item</div>
      <table className="border-separate text-xs">
        <AddedTableHeaders />
        <tbody>
          {addedItems
            .sort((a, b) => a.linea_id - b.linea_id)
            .map((item) => (
              <AddedTaleItem
                key={item.linea_id}
                item={item}
                changeItemHandler={changeItemHandler}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Added;
