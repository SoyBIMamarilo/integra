const Proyecto = require("../models/proyecto");
const Presupuesto = require("../models/presupuesto");

exports.getProyectos = async (req, res, next) => {
  let proyectos;

  try {
    proyectos = await Proyecto.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(proyectos);
  console.log(proyectos);
  return next();
};

exports.getPresupuestos = async (req, res, next) => {
  const projectId = req.params.pid;
  console.log(projectId);
  let presupuestos;

  try {
    presupuestos = await Presupuesto.findAll({
      where: { proyecto_id: projectId },
    });
  } catch (err) {
    console.log(err);
  }
  res.json(presupuestos);
  console.log(presupuestos);
  return next();
};

exports.postPresupuestos = async (req, res, next) => {
  const projectId = req.params.pid;
  const versionNumber = req.body.version;
  const version = Presupuesto.build({
    version: versionNumber,
    proyecto_id: projectId,
  });

  console.log(version instanceof Presupuesto);
  console.log(version.version);

  try {
    await version.save();
  } catch (err) {
    console.log(err);
  }

  next();
};
