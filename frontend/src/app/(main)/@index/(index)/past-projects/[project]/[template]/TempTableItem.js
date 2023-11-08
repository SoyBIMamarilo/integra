"use client";
import Arrow from "@/components/svg/arrow";
import { useEffect, useState } from "react";

const TempTableItem = async ({ tempRow }) => {
  const [open, setOpen] = useState(false);
  const [childsList, setChildList] = useState([]);
  const [hideArrow, setHideArrow] = useState(false);

  const handleExpand = async () => {
    if (!open && !hideArrow) {
      const childs = await fetch(`/api/temp/${tempRow.id}/children`);
      const res = await childs.json();
      if (res.length === 0) {
        setHideArrow(true);
      } else {
        setChildList(res);
        setOpen(true);
      }
      console.log(res);
    } else {
      setChildList([]);
      setOpen(false);
    }
  };

  return (
    <>
      <tr className="text-xs font-bold">
        <td className="table-content text-center">{tempRow.id}</td>
        <td
          className="table-content flex min-h-max flex-row justify-evenly"
          onClick={handleExpand}
        >
          <div className="flex flex-auto cursor-pointer items-center text-center">
            {tempRow.cbs}
          </div>{" "}
          {hideArrow ? <></> : <Arrow open={open} />}
        </td>
        <td className="table-content text-center">{tempRow.descripcion}</td>
        <td className="table-content text-center">{tempRow.unidad_medida}</td>
        <td className="table-content text-center">{tempRow.sum}</td>
        <td className="table-content text-center">{tempRow.line_type}</td>
      </tr>
      {childsList.map((item) => {
        return <TempTableItem tempRow={item} />;
      })}
    </>
  );
};

export default TempTableItem;
