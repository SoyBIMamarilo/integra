const express = require("express");

const presupuestoControllers = require("../controllers/presupuesto-controllers");

const router = express.Router();

router.get("/ejecutados", presupuestoControllers.getEjecutados);

router.get("/paquetes/:prid/:pqid", presupuestoControllers.getReferente);

router.get("/vr_prueba", presupuestoControllers.getValorPresupuesto);

router.get("/:prid", presupuestoControllers.getPaquetesPresupuesto);

router.post("/:prid/:pqid", presupuestoControllers.postReferente);

router.post("/:prid", presupuestoControllers.postPaquetes);

module.exports = router;
