const express = require("express");

const proyectosControllers = require("../controllers/proyecto-controllers");

const router = express.Router();

router.get("/:projectId", proyectosControllers.getProject);

router.get("/:pid", proyectosControllers.getPresupuestos);

router.get("/", proyectosControllers.getProjects);

module.exports = router;
