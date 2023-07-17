const Ciudad = require("../models/ciudad");

exports.getCiudades = async (req, res, next) => {
  let ciudades;

  try {
    ciudades = await Ciudad.findByPk(1);
  } catch (err) {
    console.log(err);
  }
  res.json(ciudades);
  console.log(ciudades);
  return next();
};

exports.test = (req, res, next) => {
  console.log("test request- desde el frontend");
  res.json({ response: "sirve! esta maricada" });
  return next();
};
