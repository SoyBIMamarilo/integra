import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import TableHeaders from "./TableHeaders";

const Page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: table, error } = await supabase.rpc("comparar_presupuestos", {
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
  const project1 = table[0]
    ? `${table[0].vp1_nombre}, Versión: ${table[0].vp1_version}`
    : "Presupuesto Sin Datos";
  const project2 = table[0]
    ? `${table[0].vp2_nombre}, Versión: ${table[0].vp2_version}`
    : "Presupuesto Sin Datos";
  return (
    <table className="h-min table-fixed	border-separate ">
      <TableHeaders project1={project1} project2={project2} />
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
