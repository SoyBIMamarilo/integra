import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

export default async function Page({ params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);

  const { data, error } = await supabase.from("cbs_cantidades_rvt").select();

  console.log(data);

  return (
    <div className="mt-5 flex h-full flex-col justify-start rounded-lg border border-solid border-neutral-800 p-4 shadow-lg shadow-neutral-300">
      <table className="h-min	w-full table-fixed	border-separate ">
        <thead>
          <tr>
            <th className="h-16 rounded-tl-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold ">
              Categoria
            </th>
            <th className="h-16 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
              Familia
            </th>
            <th className="h-16 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
              Tipo
            </th>
            <th className="h-16 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
              Parametro
            </th>
            <th className="h-16 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
              Dimension
            </th>
            <th className="h-16 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
              Filtro
            </th>
            <th className="h-16 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
              Unidades
            </th>
            <th className="h-16 border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
              Cantidad
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="h-2 "></tr>

          <tr className="h-2" />

          {data.map((record) => {
            return (
              <>
                <tr>
                  <td className="table-content text-center">{record.categoria||"-"}</td>
                  <td className="table-content text-center">{record.familia||"-"}</td>
                  <td className="table-content text-center">{record.tipo||"-"}</td>
                  <td className="table-content text-center">{record.parametro||"-"}</td>
                  <td className="table-content text-center">{record.dimension||"-"}</td>
                  <td className="table-content text-center">{record.filtro||"-"}</td>
                  <td className="table-content text-center">{record.unidades||"-"}</td>
                  <td className="table-content text-center">{record.cantidad||"-"}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
