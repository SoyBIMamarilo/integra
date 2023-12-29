import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
  const body = await req.json();
  const count = body.count;
  const filters = body.filters;
  const limit = body.limit;
  const page = body.page;
  const args = { ...filters };
  if (!count) {
    args.items_limit = limit;
    args.page_number = page;
  }
  console.log(args);
  const { data, error } = await supabase.rpc(
    count ? "count_ejecutados" : "ejecutados_valor_v2",
    args,
  );
  console.log(error);
  return NextResponse.json(data);
}
