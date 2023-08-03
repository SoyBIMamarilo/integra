const express = require("express");

const presupuestoControllers = require("../controllers/presupuesto-controllers");

const router = express.Router();

router.get("/ejecutados", presupuestoControllers.getEjecutados);

router.get("/:prid", presupuestoControllers.getPaquetesPresupuesto);

router.get("/vr_prueba", presupuestoControllers.getValorPresupuesto);

router.post("/:prid", presupuestoControllers.postPaquetes);

module.exports = router;
