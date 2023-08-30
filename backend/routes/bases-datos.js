const express = require("express");

const dataBaseControllers = require("../controllers/bases-datos-controllers");

const router = express.Router();

router.get("/ciudades", dataBaseControllers.getCiudades);
router.get("/paquetes-trabajo", dataBaseControllers.getPaquetesTrabajo);
router.get("/indicadores", dataBaseControllers.getIndexes);

module.exports = router;
