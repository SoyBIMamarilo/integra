const supabaseFunctions = require("../util/supabase-endpoints")

exports.getProjects = supabaseFunctions.planeFetch("proyecto")

exports.getProject = supabaseFunctions.fetchFilter("proyecto","id","projectId")

exports.getPresupuestos = supabaseFunctions.fetchFilter("presupuesto","proyecto_id","pid")

exports.postPresupuestos = supabaseFunctions.getExpressCall(async (supabase, params, body)=>{
  return supabase.from("presupuesto").insert({version:body.version, proyecto_id:params.pid})
})
// const Proyecto = require("../models/proyecto");
// const Presupuesto = require("../models/presupuesto");
// const ProyectoIndicador = require("../models/proyecto_indicador");

// exports.getProjects = async (req, res, next) => {
//   console.log("proyecto-controllers getProjects");
//   let proyectos;
//   try {
//     proyectos = await Proyecto.findAll();
//   } catch (err) {
//     console.log(err);
//   }
//   res.status(200).json(proyectos);
// };

// exports.getProject = async (req, res, next) => {
//   console.log("proyecto-controllers getProject");
//   let project;
//   try {
//     project = await Proyecto.findByPk(req.params.projectId);
//   } catch (err) {
//     console.log(err);
//   }
//   res.status(200).json(project);
// };

// exports.getPresupuestos = async (req, res, next) => {
//   console.log("proyecto-controllers getPresupuestos");
//   const projectId = req.params.pid;
//   projectId;
//   let presupuestos;

//   try {
//     presupuestos = await Presupuesto.findAll({
//       where: { proyecto_id: projectId },
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   res.status(200).json(presupuestos);
// };

// exports.postProject = async (req, res, next) => {
//   console.log("proyecto-controllers postProject");
//   const nombre = req.body.nombre;
//   const ciudad_id = req.body.ciudad;
//   const version = Proyecto.build({
//     nombre,
//     ciudad_id,
//   });

//   try {
//     await version.save();
//   } catch (err) {
//     console.log(err);
//   }

//   res.status(201).json({ message: "Presupuesto Creado", presupuesto: version });
// };

// exports.postProjectIndices = async (req, res, next) => {
//   console.log("proyecto-controllers postIndicador");
//   const proyecto_id = req.body.project_id;
//   const indices = req.body.indices;
//   console.log(proyecto_id);
//   console.log(indices);

//   for (var key in indices) {
//     const temp = ProyectoIndicador.build({
//       indicador_id: +key,
//       proyecto_id,
//       valor: +indices[key],
//     });
//     console.log(temp);
//     try {
//       await temp.save();
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   res.status(201).json({ message: "Indicadores creados" });
// };
