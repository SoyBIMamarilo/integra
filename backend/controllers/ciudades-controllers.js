const Ciudad = require("../models/ciudad");

exports.getCiudades = async (req, res, next) => {
  let ciudades;

  try {
    ciudades = await Ciudad.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(ciudades);
  // res.json({
  //   ciudades: ciudades.map((ciudad) => ciudad.toObject({ getters: true })),
  // });
  console.log(ciudades);
  return next();
};

exports.test = (req, res, next) => {
  console.log("test request- desde el frontend");
  res.json({ response: "sirve! esta maricada" });
  return next();
};
