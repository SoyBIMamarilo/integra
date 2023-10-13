import GroupCard from "@/components/card/group-card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";
import ItemListCard from "./ItemListCard";
import ItemListCreateButton from "./ItemListCreateButton";

const ItemsList = async ({project}) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);

  const { data: templates, error } = await supabase
    .from("plantilla_presupuesto")
    .select("*").eq("proyecto_id",project);
  return (
    <GroupCard title="Plantillas de presupuesto" styles="min-w-[30%]">
      {templates.map((template) => {
        return <ItemListCard key={template.id} item={template} />;
      })}
      <ItemListCreateButton project={project}/>
    </GroupCard>
  );
};

export default ItemsList;
