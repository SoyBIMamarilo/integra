"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import { supabaseOptions } from "@/util/supabase";
import Loading from "../loading";
import CityGroupProjectHeaders from "./CityGroupProjectHeaders";
import CityGroupProjectBudget from "./CityGroupProjectBudget";

const CityGroupProject = ({ project }) => {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState(null);
  // console.log("City Group Project!!!!");
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetch(`/api/project-summary/${project}`);
      const dataProjects = await data.json();
      console.log(dataProjects);
      setBudgets(dataProjects);
      setLoading(false);
    };
    loadData();
  }, [project]);

  return (
    <>
      {loading && <Loading />}
      {budgets && (
        <table className="ml-4 table-fixed	border-separate">
          <CityGroupProjectHeaders />
          <tbody>
            {budgets
              .sort((a, b) => a.version - b.version)
              .map((budget) => (
                <CityGroupProjectBudget key={budget.id} item={budget} />
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CityGroupProject;
