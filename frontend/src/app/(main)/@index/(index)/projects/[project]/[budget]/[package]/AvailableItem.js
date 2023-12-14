"use client";

import { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { nf } from "@/util/date-format";
import Plus from "@/components/svg/plus";
import Minus from "@/components/svg/minus";
import TreeArrow from "@/components/svg/treeArrow";
import SeparatorComponent from "@/components/separator";

const AvailableItem = ({ project, addItemsHandler, isChild, isLastChild }) => {
  // console.log("Available Item", project);
  const [items, setItems] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetch(
        `/api/historic-budgets/${project.id}/${project.proyecto_id}`
      );
      const dataProjects = await data.json();
      setItems(dataProjects.map((item) => ({ ...item, modified: false })));
    };
    loadData();
  }, [setItems]);

  const setExpandedHandler = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        className="flex flex-row items-center p-1 pl-0 text-xs hover:cursor-pointer hover:bg-neutral-300	"
        value={project.linea_id}
        onClick={(event) => null}
      >
        {isChild && <TreeArrow />}
        <div className="pr-1">
          {!expanded && !isLastChild && <Plus onClick={setExpandedHandler} />}
          {expanded && !isLastChild && <Minus onClick={setExpandedHandler} />}
        </div>

        <div className="flex grow flex-col">
          <div className="flex grow flex-row">
            <div >{project.descripcion + " ,"}</div>
            <div className="pl-1 font-bold">{project.nombre}</div>
          </div>
          <span>{project.cbs}</span>
          <div className="font-bold">{nf.format(project.sum)}</div>
        </div>
        <Checkbox.Root
          className="ml-3 flex h-[25px] w-[25px]  items-center justify-center rounded-[4px] bg-white  shadow-blackA4 outline outline-1 outline-blackA4  hover:bg-integra-secondary focus:shadow-[0_0_0_2px_black] shrink-0"
          id="c1"
          onClick={() => addItemsHandler(project)}
        >
          <Checkbox.Indicator className="text-integra-text">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>

      <div className="pl-3.5">
        <div className="border 2 border-transparent border-l-blackA6">
          {expanded && items && (
            <div className="flex flex-col">
              {items.map((item, index) => (
                <div >
                  <AvailableItem
                    key={item.linea_id}
                    project={item}
                    addItemsHandler={addItemsHandler}
                    isChild={true}
                  // isLastChild={item.length == 0}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableItem;
