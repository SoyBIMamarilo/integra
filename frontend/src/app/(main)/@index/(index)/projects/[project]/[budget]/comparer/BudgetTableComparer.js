"use client";
import { useState } from "react";
import BudgetTableComparerHeader from "./BudgetTableComparerHeader";
import BudgetTableComparerBodyItem from "./BudgetTableComparerBodyItem";
import BudgetControls from "./BudgetControls";
const BudgetTableComparer = ({ params }) => {
  let { project, budget } = params;
  const [selectedproject, setProjectSelected] = useState("");
  const [selectedversion, setVersionSelected] = useState("");
  const handlerNameProjects = (e, value) => {
    setVersionSelected(e.target.value);
    setProjectSelected(value);
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-1">
        <div className="col-span-12 flex items-center pt-12">
          <BudgetControls onSelectProyect={handlerNameProjects} />
        </div>

        <div className="col-span-12 grid items-center">
          <table className="h-min	w-full 	table-auto ">
            <BudgetTableComparerHeader
              projectName={project}
              selectedproject={selectedproject}
            />
            <tbody>
              <BudgetTableComparerBodyItem
                budget={budget}
                budgetDestine={selectedversion}
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default BudgetTableComparer;
