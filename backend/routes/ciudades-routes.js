const express = require("express");

const ciudadesControllers = require("../controllers/ciudades-controllers");

const router = express.Router();

router.get("/", ciudadesControllers.getCiudades);
router.get("/test", ciudadesControllers.test);

module.exports = router;
