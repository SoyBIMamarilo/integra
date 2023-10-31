import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseOptions } from "@/util/supabase";

import { headers, cookies } from "next/headers";
import Create from "./CreateForm";

const page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: indices, error } = await supabase.rpc("proyecto_indicadores", {
    proyecto: params.project,
  });
  return <Create indices={indices} project={params.project} />;
};

export default page;
