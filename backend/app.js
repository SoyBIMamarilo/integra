const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();


const sequelize = require("./util/database");
const Ciudad = require("./models/ciudad");
const PaqueteTrabajo = require("./models/paquete_trabajo");
const Presupuesto = require("./models/presupuesto");
const Proyecto = require("./models/proyecto");
const PresupuestoPaqueteTrabajo = require("./models/presupuesto_paquete_trabajo");
const Item = require("./models/item");

const ciudadRoutes = require("./routes/bases-datos");
const proyectoRoutes = require("./routes/proyectos");
const presupuestosRoutes = require("./routes/presupuestos");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json());

app.use("/bases-datos", ciudadRoutes);
app.use("/proyectos", proyectoRoutes);
app.use("/presupuestos", presupuestosRoutes);

sequelize
  .sync()
  .then(() => app.listen(8080))
  .catch((err) => console.log(err));
