import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    const { id } = res.params;
    const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
    const { data, error } = await supabase.rpc("item_datos", {
      item_id: id,
    });
    console.log(data);
    return NextResponse.json(data);
  } catch (err) {
    console.log("Api versions Op:Get", err);
  }
}
