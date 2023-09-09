const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const ciudadRoutes = require("./routes/bases-datos");
const proyectoRoutes = require("./routes/proyectos");
const presupuestosRoutes = require("./routes/presupuestos");
const itemRoutes = require("./routes/item");

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
app.listen(8080)
