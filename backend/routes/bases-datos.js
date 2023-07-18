const express = require("express");

const ciudadesControllers = require("../controllers/bases-datos-controllers");

const router = express.Router();

router.get("/ciudades", ciudadesControllers.getCiudades);
router.get("/paquetes-trabajo", ciudadesControllers.getPaquetesTrabajo);

module.exports = router;
