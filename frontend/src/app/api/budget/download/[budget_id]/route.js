import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, res, { params }) {
    const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
    const project_id = params.project_id;
    let data_item_referente, data_item_manual = [];
    const { data_manual, error_manual } = await supabase.rpc("presupuesto_por_item_manual", { presupuesto: project_id });
    const { data_item, error_item } = await supabase.rpc("presupuesto_por_item", { presupuesto: project_id });
    data_item_referente = req.json(data_item).map;
    data_item_manual = req.json(data_manual).map;
    data_item_manual.map((item) => { item.type = "manual" });
    data_item_referente.map((item) => { item.type = "Referente" });
    let data= [...data_item_manual, ...data_item_referente];
    return NextResponse.json(data);
}