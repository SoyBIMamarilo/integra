const express = require("express");

const proyectosControllers = require("../controllers/proyecto-controllers");

const router = express.Router();

router.get("/", proyectosControllers.getProyectos);

module.exports = router;
