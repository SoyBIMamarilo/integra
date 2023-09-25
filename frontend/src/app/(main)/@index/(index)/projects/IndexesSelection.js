import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import IndexesSelctionList from "./IndexesSelctionList";

const IndexexSelection = async () => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: indexes, error } = await supabase.from("indicador").select("*");
  console.log(indexes);
  // console.log(error);

  return (
    <div className="basis-1/2">
      <div className="title-black w-min	">Indices</div>
      <IndexesSelctionList indexes={indexes} />
    </div>
  );
};

export default IndexexSelection;
