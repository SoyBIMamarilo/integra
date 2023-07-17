const express = require("express");
require("dotenv").config();

const sequelize = require("./util/database");
const Ciudad = require("./models/ciudad");
const PaqueteTrabajo = require("./models/paquete_trabajo");
const Presupuesto = require("./models/presupuesto");
const Proyecto = require("./models/proyecto");

const ciudadRoutes = require("./routes/ciudades-routes");

const app = express();

app.use("/ciudades", ciudadRoutes);

sequelize
  .sync()
  .then((result) => {
    return Ciudad.findAll();
  })
  .then((ciudad) => {
    console.log(JSON.stringify(ciudad, null, 2));
  })
  .then(() => app.listen(8080))
  .catch((err) => console.log(err));
