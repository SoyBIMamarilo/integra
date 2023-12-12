"use client";

import { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { nf } from "@/util/date-format";
import Plus from "@/components/svg/plus";
import Minus from "@/components/svg/minus";

const AvailableSearchItem = ({ project, addItemsHandler, itemList }) => {
  const childItems = itemList.filter(
    (it) => it.parent_id == project.id && it.proyecto_id == project.proyecto_id
  );
  // console.log(childItems);
  const [expanded, setExpanded] = useState(true);

  const setExpandedHandler = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        className="flex flex-row items-center p-1 text-xs hover:cursor-pointer hover:bg-neutral-300	"
        value={project.linea_id}
        onClick={(event) => null}
      >
        {!expanded && <Plus onClick={setExpandedHandler} />}
        {expanded && <Minus onClick={setExpandedHandler} />}
        <div className="flex grow flex-col">
          <div>{project.descripcion}</div>
          <div className="font-bold">{nf.format(project.sum)}</div>
        </div>
        <div className="flex grow flex-col items-end ">
          <div>{project.nombre}</div>
          <span>{project.cbs}</span>
        </div>
        <Checkbox.Root
          className="ml-3 flex h-[25px] w-[25px]  items-center justify-center rounded-[4px] bg-white  shadow-blackA4 outline-none hover:bg-integra-secondary focus:shadow-[0_0_0_2px_black]"
          id="c1"
          onClick={() => addItemsHandler(project)}
        >
          <Checkbox.Indicator className="text-integra-text">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>

      <div className="pl-1">
        {expanded &&
          childItems &&
          childItems.map((item) => (
            <AvailableSearchItem
              key={item.linea_id}
              project={item}
              addItemsHandler={addItemsHandler}
              itemList={itemList}
            />
          ))}
      </div>
    </>
  );
};

export default AvailableSearchItem;
