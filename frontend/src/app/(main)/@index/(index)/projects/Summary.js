import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

const Summary = async () => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  //   const { data: projects, error } = await supabase.rpc(
  //     "presupuestos_informacion"
  //   return <></>;
};

export default Summary;
