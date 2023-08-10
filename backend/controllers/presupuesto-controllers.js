const { QueryTypes } = require("sequelize");

const Presupuesto = require("../models/presupuesto");
const PresupuestoPaqueteTrabajo = require("../models/presupuesto_paquete_trabajo");
const ValorPresupuesto = require("../models/valor_presupuesto");
const Item = require("../models/item");
const sequelize = require("../util/database");

const supabaseFunctions = require("../util/planeFetch");

exports.getPaquetesPresupuesto = supabaseFunctions.getExpressCall(
  async (supabase, params) => {
    return supabase
      .from("presupuesto_paquete_trabajo")
      .select(
        `
  *,
  paquete_trabajo!left (id, nombre )
  `
      )
      .eq("presupuesto_id", params.prid);
  }
);

exports.getValorPresupuesto = supabaseFunctions.planeFetch("valor_presupuesto");

exports.postPaquetes = supabaseFunctions.getExpressCall(
  async (supabase, params, body) => {
    return supabase.from("presupuesto_paquete_trabajo").insert({
      presupuesto_id: params.prid,
      paquete_trabajo_id: body.paquete,
    });
  }
);

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

exports.postReferente = supabaseFunctions.getExpressCall(
  async (supabase, params, body) => {
    return supabase.from("item").insert({
      presupuesto_id: params.prid,
      paquete_trabajo_id: params.pqid,
      referente_id: body.referente,
    });
  }
);

exports.getReferente = async (req, res, next) => {
  const presupuestoId = req.params.prid;
  const paqueteId = req.params.pqid;

  try {
    referente = await sequelize.query(
      `select * from presupuesto.item it
      left join presupuesto.valor_presupuesto tm on it.referente_id=tm.linea_id 
      left join presupuesto.proyecto py on tm.proyecto_id=py.id
      where presupuesto_id=:pid and paquete_trabajo_id=:pqid`,
      {
        replacements: { pid: presupuestoId, pqid: paqueteId },
        type: QueryTypes.SELECT,
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.json(referente);
  console.log(referente);
  return next();
};
