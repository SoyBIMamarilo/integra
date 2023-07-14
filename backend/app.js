const express = require("express");
require("dotenv").config();

const ciudadesControllers = require("./controllers/ciudades-controllers");

const sequelize = require("./util/database");
const Ciudad = require("./models/ciudad");
const PaqueteTrabajo = require("./models/paquete_trabajo");
const Presupuesto = require("./models/presupuesto");
const Proyecto = require("./models/proyecto");

const app = express();

// app.use((req, res, next) => {
//   Ciudad.findAll()
//     .then((ciudades) => {
//       console.log(ciudades);
//     })
//     .catch((err) => console.log(err));
// });

app.get("/", ciudadesControllers.getCiudades);

app.get("/test", ciudadesControllers.test);

sequelize
  .sync()
  .then((result) => {
    // return Ciudad.findByPk(1);
  })
  .then((ciudad) => {
    // console.log(ciudad);
    // if (!ciudad) {
    //   return Ciudad.create({ nombre: "Bogotá" });
    // }
    // return ciudad;
  })
  .then(() => app.listen(5000))
  .catch((err) => console.log("Error"));
