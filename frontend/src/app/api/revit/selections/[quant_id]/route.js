import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
    try {
        const { quant_id } = res.params
        const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
        const { data, error } = await supabase.from("elemento_manual").select("*").eq('cbs_cantidades_rvt', quant_id);
        return NextResponse.json(data);
    } catch (err) {
        console.log("Api versions Op:Get", err);
    }

}