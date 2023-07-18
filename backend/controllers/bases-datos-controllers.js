const Ciudad = require("../models/ciudad");
const PaqueteTrabajo = require("../models/paquete_trabajo");

exports.getCiudades = async (req, res, next) => {
  let ciudades;

  try {
    ciudades = await Ciudad.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(ciudades);
  console.log(ciudades);
  return next();
};

exports.getPaquetesTrabajo = async (req, res, next) => {
  let paquetesTrabajo;

  try {
    paquetesTrabajo = await PaqueteTrabajo.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(paquetesTrabajo);
  console.log(paquetesTrabajo);
  return next();
};
