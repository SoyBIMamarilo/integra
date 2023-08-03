const express = require("express");

const presupuestoControllers = require("../controllers/presupuesto-controllers");

const router = express.Router();

router.get(
  "/presupuesto-paquete",
  presupuestoControllers.getPaquetesPresupuesto
);

router.get("/vr_prueba", presupuestoControllers.getValorPresupuesto);

module.exports = router;
