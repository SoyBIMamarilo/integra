const express = require("express");
require("dotenv").config();

const sequelize = require("./util/database");
const Ciudad = require("./models/ciudad");
const PaqueteTrabajo = require("./models/paquete_trabajo");
const Presupuesto = require("./models/presupuesto");
const Proyecto = require("./models/proyecto");

const ciudadRoutes = require("./routes/bases-datos");
const proyectoRoutes = require("./routes/proyectos");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/bases-datos", ciudadRoutes);
app.use("/proyectos", proyectoRoutes);

sequelize
  .sync()
  .then(() => app.listen(8080))
  .catch((err) => console.log(err));
