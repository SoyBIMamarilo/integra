import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import TableHeaders from "./TableHeaders";

const Page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: table, error } = await supabase.rpc("comparar_presupeustos", {
    origen: params.origin_id,
    destino: params.dest_id,
  });

  const categorias = [
    ...new Set(
      table
        .sort((a, b) => a.paquete_categoria_orden - b.paquete_categoria_orden)
        .map((it) => it.paquete_categoria)
    ),
  ];

  return (
    <table className="h-min table-fixed	border-separate ">
      <TableHeaders originProject={originProjectId} destinationProject={destinationProjectName} />
      <tbody>
        {categorias.map((cat) => (
          <TableBody
            key={cat}
            name={cat}
            table={table.filter((it) => it.paquete_categoria == cat)}
          />
        ))}
        <TableFooter table={table} />
      </tbody>
    </table>
  );
};

export default Page;
