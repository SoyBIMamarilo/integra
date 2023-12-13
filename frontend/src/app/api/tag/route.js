import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const res = await supabase
    .from("presupuesto_tag")
    .insert({ presupuesto_id: body.budget, texto: body.tag });
  return NextResponse.json({ message: "Created" }, { status: 202 });
}
