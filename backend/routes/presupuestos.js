const express = require("express");

const presupuestoControllers = require("../controllers/presupuesto-controllers");

const router = express.Router();

// router.get(
//   "/proyecto/values/:projectId",
//   presupuestoControllers.getValuesProject
// );

// router.get("/proyecto/:projectId", presupuestoControllers.getBudgetProject);

// router.post("/proyecto/:projectId", presupuestoControllers.postBudget);

// router.get(
//   "/paquetes/:budgetId",
//   presupuestoControllers.getPaquetesPresupuesto
// );

// router.get(
//   "/paquetes/values/:budgetId",
//   presupuestoControllers.getPaquetesValuesBudget
// );

// router.get("/values/:budgetId", presupuestoControllers.getValuesBudget);

// router.get("/items/:budgetId", presupuestoControllers.getItemsBudget);

// router.post("/paquete/:budgetId", presupuestoControllers.postPaquetes);

// router.delete("/paquete", presupuestoControllers.deletePresupuestoPaquete);

// router.delete("/:prid", presupuestoControllers.deletePresupuestos);

// router.get("/ejecutados", presupuestoControllers.getEjecutados);

// router.get("/paquetes/:prid/:pqid", presupuestoControllers.getReferente);

// router.get("/vr_prueba", presupuestoControllers.getValorPresupuesto);

// router.get("/paquetes/:prid", presupuestoControllers.getPaquetesPresupuesto);

// router.post("/:prid/:pqid", presupuestoControllers.postReferente);

// router.get(
//   "/indicadores/:prorid/:prdestid",
//   presupuestoControllers.getIndicadores
// );

// router.post("/referente/:prid/:pqid", presupuestoControllers.postReferente);

module.exports = router;
