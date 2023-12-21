import { supabaseOptions } from "@/util/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import FolderNavigator from "./FolderNavigator";

export default async function Page({ params }) {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data, error } = await supabase
    .from("modelo_rvt")
    .select()
    .eq("project_id", params.project)

  return <FolderNavigator projectAdsk={data} />;
}
