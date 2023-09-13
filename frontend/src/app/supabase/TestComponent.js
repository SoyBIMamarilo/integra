import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { supabaseOptions } from "@/util/supabase";

export default async function TestComponent() {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const allCookies = cookies().getAll();
  console.log(allCookies);
  const packages = await supabase.rpc("presupuesto_paquetes_trabajo", {
    presupuesto: 1,
  });
  console.log(packages);
  return (
    <>
      <div>procesado</div>
    </>
  );
}
