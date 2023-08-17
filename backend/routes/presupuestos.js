const express = require("express");

const presupuestoControllers = require("../controllers/presupuesto-controllers");

const router = express.Router();

router.get("/prueba/:p", (req, res, next) => {
  res.status(200).json({ message: "Exito!!!", text: req.params.p });
});

router.get("/ejecutados", presupuestoControllers.getEjecutados);

router.get("/vr_prueba", presupuestoControllers.getValorPresupuesto);

router.get("/:prid", presupuestoControllers.getPaquetesPresupuesto);

router.get("/paquetes/:prid/:pqid", presupuestoControllers.getReferente);

router.get(
  "/indicadores/:prorid/:prdestid",
  presupuestoControllers.getIndicadores
);

router.post("/:prid/:pqid", presupuestoControllers.postReferente);

router.post("/:prid", presupuestoControllers.postPaquetes);

router.delete("/paquete", presupuestoControllers.deletePresupuestoPaquete);

router.delete("/:prid", presupuestoControllers.deletePresupuestos);

module.exports = router;
