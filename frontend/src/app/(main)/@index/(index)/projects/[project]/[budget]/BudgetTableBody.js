import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import BudgetTableBodyItem from "./BudgetTableBodyItem";
// import BudgetTableBodyItem from "./BudgetItemTest";

const BudgetTableBody = async ({ budget }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);

  const { data: packages, errorPackages } = await supabase.rpc(
    "presupuesto_paquetes_trabajo",
    {
      presupuesto: budget,
    }
  );
  const { data: packagesValues, errorValues } = await supabase.rpc(
    "presupuesto_por_paquetes",
    {
      presupuesto: budget,
    }
  );
  const { data: itemsValues, errorValuesItems } = await supabase.rpc(
    "presupuesto_por_item",
    {
      presupuesto: budget,
    }
  );
  const { data: itemsValuesManual, errorValuesItemsManual } =
    await supabase.rpc("presupuesto_por_item_manual", {
      presupuesto: budget,
    });

  return (
    <>
      {/* <BudgetTableBodyItem /> */}
      {packages.map((packageItem) => (
        <BudgetTableBodyItem
          paquete={packageItem}
          packageValue={
            packagesValues.filter(
              (it) => it.paquete_trabajo_id == packageItem.paquete_trabajo_id
            )[0]
          }
          itemValue={itemsValues.filter(
            (it) => it.paquete_trabajo_id == packageItem.paquete_trabajo_id
          )}
          manualValue={itemsValuesManual.filter(
            (it) => it.paquete_trabajo_id == packageItem.paquete_trabajo_id
          )}
        />
      ))}
    </>
  );
};

export default BudgetTableBody;
