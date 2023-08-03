const Presupuesto = require("../models/presupuesto");
const PresupuestoPaqueteTrabajo = require("../models/presupuesto_paquete_trabajo");
const ValorPresupuesto = require("../models/valor_presupuesto");

exports.getPaquetesPresupuesto = async (req, res, next) => {
  let paquetes;

  console.log("Presupuesto_paquete");
  try {
    paquetes = await PresupuestoPaqueteTrabajo.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(paquetes);
  console.log(paquetes);
  return next();
};

exports.getValorPresupuesto = async (req, res, next) => {
  let valorPresupuesto;

  console.log("");
  try {
    valorPresupuesto = await ValorPresupuesto.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(valorPresupuesto);
  console.log(valorPresupuesto);
  return next();
};
