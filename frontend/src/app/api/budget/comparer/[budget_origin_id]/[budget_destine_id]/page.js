import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
    try {
        const { budget_origin_id, budget_destine_id } = res.params
        const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);

        let { data: data_package, error_manual } = await supabase.rpc("presupuesto_comparer_paquete", { presupuesto_origen: budget_origin_id, presupuesto_dest: budget_destine_id });

        return NextResponse.json(data_package);
    } catch (err) {
        console.log("Api Presupuesto Op:Get", err);
    }

}