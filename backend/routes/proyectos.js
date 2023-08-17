const express = require("express");

const proyectosControllers = require("../controllers/proyecto-controllers");

const router = express.Router();

router.post("/presupuesto/:pid", proyectosControllers.postPresupuestos);

router.get("/:pid", proyectosControllers.getPresupuestos);

router.get("/", proyectosControllers.getProyectos);

module.exports = router;
