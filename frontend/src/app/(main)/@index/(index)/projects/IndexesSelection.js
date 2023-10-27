import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import IndexesSelctionList from "./IndexesSelctionList";

const IndexexSelection = async () => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: indexes, error } = await supabase.from("indicador").select("*");
  console.log(error);

  return (
    <div className="basis-1/2">
      <div className="mb-2 mt-1 text-2xl font-semibold	">Indices</div>
      <IndexesSelctionList indexes={indexes} />
    </div>
  );
};

export default IndexexSelection;
