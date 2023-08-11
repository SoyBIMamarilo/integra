const supabaseFunctions = require("../util/supabase-endpoints");

exports.getPaquetesPresupuesto = supabaseFunctions.getExpressCall(
  async (supabase, params) => {
    return supabase
      .from("presupuesto_paquete_trabajo")
      .select(
        `
  *,
  paquete_trabajo!left (id, nombre )
  `
      )
      .eq("presupuesto_id", params.prid);
  }
);

exports.getValorPresupuesto = supabaseFunctions.planeFetch("valor_presupuesto");

exports.postPaquetes = supabaseFunctions.getExpressCall(
  async (supabase, params, body) => {
    return supabase.from("presupuesto_paquete_trabajo").insert({
      presupuesto_id: params.prid,
      paquete_trabajo_id: body.paquete,
    });
  }
);

exports.getEjecutados = supabaseFunctions.getExpressCall(async (supabase) => {
  return supabase.rpc("get_ejecutados");
});

exports.postReferente = supabaseFunctions.getExpressCall(
  async (supabase, params, body) => {
    return supabase.from("item").insert({
      presupuesto_id: params.prid,
      paquete_trabajo_id: params.pqid,
      referente_id: body.referente,
    });
  }
);

exports.getReferente = supabaseFunctions.getExpressCall(async (supabase,params) => {
  return supabase.rpc("get_referente",{pid:params.prid,pqid:params.pqid});
});
