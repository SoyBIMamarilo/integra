import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseOptions } from "@/util/supabase";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
    try {
        const supabase = createRouteHandlerClient({ cookies }, supabaseOptions);
        const budget_id = res.params.budget_id;
        console.log(budget_id);
        let { data: data_item_manual, error_manual } = await supabase.rpc("presupuesto_por_item_manual", { presupuesto: budget_id });
        let { data: data_item, error_item } = await supabase.rpc("presupuesto_por_item", { presupuesto: budget_id });
        data_item_manual = data_item_manual.map((item) => ({ ...item, "type": "manual", pyrefnombre: "", cbs: "", item_id: "" ,descripcion:""}));
        data_item = data_item.map((item) => ({ ...item, "type": "Referente", nombre: item.descripcion,item_id:"" }));
        let data = [...data_item_manual, ...data_item];
        return NextResponse.json(data);
    } catch (err) {
        console.log("Api Presupuesto Op:Get", err);
    }

}