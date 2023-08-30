const Ciudad = require("../models/ciudad");
const PaqueteTrabajo = require("../models/paquete_trabajo");
const Indicadores = require("../models/indicadores");

exports.getCiudades = async (req, res, next) => {
  let ciudades;

  try {
    ciudades = await Ciudad.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(ciudades);
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
  return next();
};

exports.getIndexes = async (req, res, next) => {
  let indicadores;

  try {
    indicadores = await Indicadores.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(indicadores);
};
