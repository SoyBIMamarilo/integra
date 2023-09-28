import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const project = body.project;
  const items = body.items;
  const version = body.version;
  const { data: tempV, error: tempE } = await supabase
    .from("plantilla_presupuesto")
    .insert({ proyecto_id: project, version })
    .select("id");
    console.log(tempE)
  const newViD = tempV[0].id;
  items.forEach((element) => {
    element.plantilla_presupuesto_id = newViD;
  });
  console.log(items);
  const { data, error } = await supabase.from("temp").insert(items);
  //console.log(data);
  //console.log(error);
  return NextResponse.json(data);
}
