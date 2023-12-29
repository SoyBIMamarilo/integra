import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import BudgetList from "./BudgetList";
import GroupCard from "@/components/card/group-card";
import Report from "./Report";
import { supabaseOptions } from "@/util/supabase";

export default async function Page({ params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: budgets, error } = await supabase
    .from("presupuesto")
    .select()
    .eq("proyecto_id", params.project)
    .order("version", { ascending: true });

  const { data: m2const, error: errorConst } = await supabase.rpc(
    "presupuesto_proyecto_m2const",
    {
      proyecto: params.project,
    },
  );
  const { data: m2vend, error: errorVend } = await supabase.rpc(
    "presupuesto_proyecto_m2vend",
    {
      proyecto: params.project,
    },
  );
  const { data: vrTot, error: errorTot } = await supabase.rpc(
    "presupuesto_proyecto_vrtot",
    {
      proyecto: params.project,
    },
  );

  return (
    <>
      <div className=" flex grow flex-row">
        <BudgetList budgets={budgets} project={params.project} />
        {/* <GroupCard title="Reportes" /> */}
        <Report total={vrTot} m2const={m2const} m2vend={m2vend} />
      </div>
    </>
  );
}
