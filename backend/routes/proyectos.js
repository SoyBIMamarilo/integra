const express = require("express");

const proyectosControllers = require("../controllers/proyecto-controllers");

const router = express.Router();

router.get("/proyecto/:projectId", proyectosControllers.getProject);

router.get("/:pid", proyectosControllers.getPresupuestos);

router.get("/", proyectosControllers.getProjects);

// router.post("/indices", proyectosControllers.postProjectIndices);

// router.post("/", proyectosControllers.postProject);

module.exports = router;
