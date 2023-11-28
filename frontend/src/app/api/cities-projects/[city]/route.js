import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  const { city } = res.params;
  console.log(city);
  try {
    console.log("CITY PARAMS");
    const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
    const { data, error } = await supabase.rpc("proyectos_por_ciudad", {
      ciudad: city,
    });
    return NextResponse.json(data);
  } catch (err) {
    console.log("Api versions Op:Get", err);
  }
}
