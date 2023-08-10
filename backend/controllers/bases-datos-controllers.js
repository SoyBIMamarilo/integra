const Ciudad = require("../models/ciudad");
const PaqueteTrabajo = require("../models/paquete_trabajo");
const supabaseFunctions = require("../util/planeFetch")

exports.getCiudades = supabaseFunctions.planeFetch("ciudad")

exports.getPaquetesTrabajo = supabaseFunctions.planeFetch("paquete_trabajo")
