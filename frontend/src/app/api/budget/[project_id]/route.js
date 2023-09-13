import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const project_id = params.project_id;
  const { data, error } = await supabase
    .from("presupuesto")
    .select()
    .eq("proyecto_id", project_id)
    .order("version", { ascending: true });
  return NextResponse.json(data);
}
