"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { supabaseOptions } from "@/util/supabase";
import CityGroupProjectHeaders from "./CityGroupProjectHeaders";
import CityGroupProjectBudget from "./CityGroupProjectBudget";

const CityGroupProject = ({ project }) => {
  const [budgets, setBudgets] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      console.log("Loading Projects");
      const supabase = createClientComponentClient(supabaseOptions);
      const { data, error } = await supabase.rpc(
        "presupuesto_total_por_proyecto",
        {
          proyecto: project,
        }
      );
      console.log(data);
      setBudgets(data);
    };
    loadData();
  }, []);

  return (
    budgets && (
      <table>
        <CityGroupProjectHeaders />
        {budgets
          .sort((a, b) => a.version - b.version)
          .map((budget) => (
            <CityGroupProjectBudget key={budget.id} item={budget} />
          ))}
      </table>
    )
  );
};

export default CityGroupProject;
