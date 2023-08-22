const { QueryTypes } = require("sequelize");

const Presupuesto = require("../models/presupuesto");
const PresupuestoPaqueteTrabajo = require("../models/presupuesto_paquete_trabajo");
const ValorPresupuesto = require("../models/valor_presupuesto");
const Item = require("../models/item");
const sequelize = require("../util/database");

exports.getBudgetProject = async (req, res, next) => {
  console.log("presupuesto-controllers getBudgetProject");
  const projectId = req.params.projectId;
  projectId;

  let presupuestos;

  try {
    presupuestos = await Presupuesto.findAll({
      where: { proyecto_id: projectId },
    });
  } catch (err) {
    console.log(err);
  }

  console.log(presupuestos);
  res.status(200).json(presupuestos);
};

exports.postBudget = async (req, res, next) => {
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

exports.getPaquetesPresupuesto = async (req, res, next) => {
  console.log("proyect-controllers getPaquetesPresupuesto");
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
  return next();
};

exports.getValorPresupuesto = async (req, res, next) => {
  console.log("proyect-controllers getValorPresupuesto");

  let valorPresupuesto;

  try {
    valorPresupuesto = await ValorPresupuesto.findAll();
  } catch (err) {
    console.log(err);
  }
  res.json(valorPresupuesto);
  return next();
};

exports.postPaquetes = async (req, res, next) => {
  console.log("proyect-controllers postPaquetes");

  const presupuestoId = req.params.prid;
  const paquete = req.body.paquete;

  const presupuestoPaquete = PresupuestoPaqueteTrabajo.build({
    presupuesto_id: presupuestoId,
    paquete_trabajo_id: paquete,
  });

  try {
    await presupuestoPaquete.save();
  } catch (err) {
    console.log(err);
  }

  next();
};

exports.getEjecutados = async (req, res, next) => {
  console.log("proyect-controllers getEjecutados");

  let ejecutados;

  try {
    ejecutados = await sequelize.query(
      `select * from presupuesto.valor_presupuesto vp 
      left join presupuesto.proyecto pr on vp.proyecto_id=pr.id 
      where line_type!='Position';`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(ejecutados);
};

exports.postReferente = async (req, res, next) => {
  console.log("proyect-controllers postReferente");

  const presupuesto_id = req.params.prid;
  const paquete_trabajo_id = req.params.pqid;
  const referente_id = req.body.referente_id;
  const indicador_origen_id = req.body.origen_id;
  const factor_ponderacion = req.body.ponderacion;
  const indicador_destino_id = req.body.destino_id;
  const descripcion_ajuste = req.body.descripcion;

  const item = Item.build({
    presupuesto_id,
    paquete_trabajo_id,
    referente_id,
    indicador_origen_id,
    factor_ponderacion,
    indicador_destino_id,
    descripcion_ajuste,
  });

  try {
    await item.save();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ message: "Creado con exito" });
};

exports.getReferente = async (req, res, next) => {
  console.log("proyect-controllers getReferente");

  const presupuestoId = req.params.prid;
  const paqueteId = req.params.pqid;

  try {
    referente = await sequelize.query(
      `select vp.descripcion descripcion, vp.sum suma, pi_dest.valor dest_valor, pi_or.valor or_valor, it.factor_ponderacion
        from presupuesto.item it
        inner join presupuesto.valor_presupuesto vp on it.referente_id= vp.linea_id
        inner join presupuesto.presupuesto_indicador pi_dest on it.indicador_destino_id=pi_dest.id
        inner join presupuesto.presupuesto_indicador pi_or on it.indicador_origen_id=pi_or.id
        where it.presupuesto_id=:pid and it.paquete_trabajo_id=:pqid `,
      {
        replacements: { pid: presupuestoId, pqid: paqueteId },
        type: QueryTypes.SELECT,
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ referente });
};

exports.deletePresupuestos = async (req, res, next) => {
  console.log("proyect-controllers deletePresupuestos");

  const versionNumber = req.params.prid;
  const version = await Presupuesto.findByPk(versionNumber);

  try {
    await version.destroy();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ mesage: "Presupuesto Eliminado!" });
};

exports.deletePresupuestoPaquete = async (req, res, next) => {
  console.log("proyect-controllers deletePresupuestoPaquete");

  const presupuesto = req.body.presupuesto_id;
  const paquete = req.body.paquete_id;
  const version = await PresupuestoPaqueteTrabajo.findOne({
    where: {
      presupuesto_id: presupuesto,
      paquete_trabajo_id: paquete,
    },
  });
  try {
    await version.destroy();
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ mesage: "Paquete Eliminado!" });
};

exports.getIndicadores = async (req, res, next) => {
  console.log("proyect-controllers getIndicadores");

  const origen = req.params.prorid;
  const destino = req.params.prdestid;
  let indicadores;

  try {
    indicadores = await sequelize.query(
      `WITH origen AS (
        SELECT id id_or, indicador_id ind_id_or, presupuesto_id pr_id_or, valor vr_or
        FROM presupuesto.presupuesto_indicador
        WHERE presupuesto_id=:prorid
      ),
       dest AS (
        SELECT id id_dest, indicador_id ind_id_dest, presupuesto_id pr_id_dest, valor vr_dest
        FROM presupuesto.presupuesto_indicador
        WHERE presupuesto_id=:prdestid
      )
       
      SELECT *
      FROM origen 
        INNER JOIN dest ON origen.ind_id_or=dest.ind_id_dest
        INNER JOIN presupuesto.indicador ind ON origen.ind_id_or=ind.id`,
      {
        type: QueryTypes.SELECT,
        replacements: { prorid: origen, prdestid: destino },
      }
    );
  } catch (err) {
    console.log(err);
  }
  console.log({ indicadores });
  res.status(200).json({ indicadores });
};
