const supabaseFunctions = require("../util/supabase-endpoints")

exports.getCiudades = supabaseFunctions.planeFetch("ciudad")

exports.getPaquetesTrabajo = supabaseFunctions.planeFetch("paquete_trabajo")
