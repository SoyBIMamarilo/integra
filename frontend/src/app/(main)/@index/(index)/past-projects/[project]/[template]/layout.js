import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export default async function Layout({ create, children, params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data, error } = await supabase
    .from("plantilla_presupuesto")
    .select()
    .eq("id", params.template);
  const temp = data[0];
  return (
    <>
      {create}
      <div className="mt-1 font-semibold">Versión: {temp.version}</div>
      {children}
    </>
  );
}
