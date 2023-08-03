const { QueryTypes } = require("sequelize");

const Presupuesto = require("../models/presupuesto");
const PresupuestoPaqueteTrabajo = require("../models/presupuesto_paquete_trabajo");
const ValorPresupuesto = require("../models/valor_presupuesto");
const sequelize = require("../util/database");

exports.getPaquetesPresupuesto = async (req, res, next) => {
  const presupuestoId = req.params.prid;
  let paquetes;

  try {
    paquetes = await sequelize.query(
      `select * from presupuesto.presupuesto_paquete_trabajo ppt 
      left join presupuesto.paquete_trabajo pt on ppt.paquete_trabajo_id=pt.id
      where ppt.presupuesto_id=:presupuestoId;`,
      {
        replacements: { presupuestoId: presupuestoId },
        type: QueryTypes.SELECT,
      }
    );
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

exports.postPaquetes = async (req, res, next) => {
  const presupuestoId = req.params.prid;
  const paquete = req.body.paquete;

  // console.log(presupuestoId);
  // console.log(paquete);
  const presupuestoPaquete = PresupuestoPaqueteTrabajo.build({
    presupuesto_id: presupuestoId,
    paquete_trabajo_id: paquete,
  });

  console.log(presupuestoPaquete);

  try {
    await presupuestoPaquete.save();
  } catch (err) {
    console.log(err);
  }

  next();
};

exports.getEjecutados = async (req, res, next) => {
  let ejecutados;

  try {
    ejecutados = await sequelize.query(
      `select * from presupuesto.valor_presupuesto vp 
      left join presupuesto.proyecto pr on vp.proyecto_id=pr.id 
      where line_type='Level 1';`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.json(ejecutados);
  console.log(ejecutados);
  return next();
};
