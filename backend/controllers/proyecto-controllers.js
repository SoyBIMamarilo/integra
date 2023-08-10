const Proyecto = require("../models/proyecto");
const Presupuesto = require("../models/presupuesto");
const supabaseFunctions = require("../util/planeFetch")

exports.getProyectos = supabaseFunctions.planeFetch("proyecto")

exports.getPresupuestos = supabaseFunctions.fetchFilter("presupuesto","proyecto_id","pid")

exports.postPresupuestos = supabaseFunctions.getExpressCall(async (supabase, params, body)=>{
  return supabase.from("presupuesto").insert({version:body.version, proyecto_id:params.pid})
})
