const Proyecto = require("../models/proyecto");

exports.getProyectos = async (req, res, next) => {
  let ciudades;

  try {
    proyectos = await Proyecto.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(proyectos);
  console.log(proyectos);
  return next();
};
