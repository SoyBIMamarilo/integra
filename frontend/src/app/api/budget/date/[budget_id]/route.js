import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const budget_id = params.budget_id;
  const { data, error } = await supabase
    .from("presupuesto")
    .select()
    .eq("id", budget_id);
  return NextResponse.json(data);
}

export async function POST(req, { params }) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const budget_id = params.budget_id;
  const body = await req.json();
  console.log(body);
  const res = await supabase
    .from("presupuesto")
    .update({ fecha_entrega: body.fecha_entrega })
    .eq("id", budget_id);
  return NextResponse.json(res);
}

export async function DELETE(req, { params }) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const budget_id = params.budget_id;
  const res = await supabase
    .from("presupuesto")
    .update({ fecha_entrega: null })
    .eq("id", budget_id);
  return NextResponse.json(res);
}
