const Proyecto = require("../models/proyecto");
const Presupuesto = require("../models/presupuesto");

exports.getProjects = async (req, res, next) => {
  console.log("proyecto-controllers getProjects");
  let proyectos;
  try {
    proyectos = await Proyecto.findAll();
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(proyectos);
};

exports.getProject = async (req, res, next) => {
  console.log("proyecto-controllers getProject");
  let project;
  try {
    project = await Proyecto.findByPk(req.params.projectId);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(project);
};

exports.getPresupuestos = async (req, res, next) => {
  console.log("proyecto-controllers getPresupuestos");
  const projectId = req.params.pid;
  projectId;
  let presupuestos;

  try {
    presupuestos = await Presupuesto.findAll({
      where: { proyecto_id: projectId },
    });
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(presupuestos);
};

exports.postPresupuestos = async (req, res, next) => {
  console.log("proyecto-controllers postPresupuestos");
  const projectId = req.params.pid;
  const versionNumber = req.body.version;
  const version = Presupuesto.build({
    version: versionNumber,
    proyecto_id: projectId,
  });

  try {
    await version.save();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({ message: "Presupuesto Creado" });
};
