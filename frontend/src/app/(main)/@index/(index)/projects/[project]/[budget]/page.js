import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

import BudgetTable from "./BudgetTable";
import BudgetOptions from "./BudgetOptions";
import Date from "./Date";
import Tags from "./Tags";
import Export from "./Export";
import Comparer from "./BudgetComparer/Comparer";

export default async function Page({ params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);

  const { data: budgetTotal, error } = await supabase.rpc("valor_presupuesto", {
    presupuesto: params.budget,
  });

  return (
    <div className="mt-5 flex h-full flex-col justify-between rounded-lg border border-solid border-neutral-800 p-4 shadow-md ">
      <BudgetTable
        budgetTotal={budgetTotal}
        budget={params.budget}
        project={params.project}
      />
      <div className="mt-4 flex flex-row gap-2">
        <BudgetOptions budget={params.budget} project={params.project} />
        <div className=" border-r-4 border-integra-accent" />
        <Export data={budgetTotal} />
        <Comparer />
        <Date budget={params.budget} />
        <div className=" border-r-4 border-integra-accent" />
        <Tags budget={params.budget} />
      </div>
    </div>
  );
}
