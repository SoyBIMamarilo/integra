import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const budgetId = params.project_id;
  const { data, error } = await supabase
    .from("presupuesto_tag")
    .select()
    .eq("presupuesto_id", budgetId);

  return NextResponse.json({ tags: [...data] }, { status: 200 });
}
