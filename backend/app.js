const express = require("express");
require("dotenv").config();

const sequelize = require("./util/database");
const Ciudad = require("./models/ciudad");
const PaqueteTrabajo = require("./models/paquete_trabajo");
const Presupuesto = require("./models/presupuesto");
const Proyecto = require("./models/proyecto");

const ciudadRoutes = require("./routes/bases-datos");

const app = express();

app.use("/bases-datos", ciudadRoutes);

sequelize
  .sync()
  .then(() => app.listen(8080))
  .catch((err) => console.log(err));
