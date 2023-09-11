const supabaseFunctions = require("../util/supabase-endpoints")

exports.getCiudades = supabaseFunctions.planeFetch("ciudad")

exports.getPaquetesTrabajo = supabaseFunctions.planeFetch("paquete_trabajo")

exports.getIndexes = supabaseFunctions.planeFetch("indicador")


// exports.getPaquetesTrabajo = async (req, res, next) => {
//   let paquetesTrabajo;

//   try {
//     paquetesTrabajo = await PaqueteTrabajo.findAll();
//   } catch (err) {
//     console.log(err);
//   }
//   res.json(paquetesTrabajo);
//   return next();
// };

// exports.getIndexes = async (req, res, next) => {
//   let indicadores;

//   try {
//     indicadores = await Indicadores.findAll();
//   } catch (err) {
//     console.log(err);
//   }
//   res.json(indicadores);
// };
