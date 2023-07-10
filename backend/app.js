const express = require("express");
require("dotenv").config();

const sequelize = require("./util/database");

const app = express();


sequelize
  .authenticate()
  .then((result) => {
    console.log("Conectado");
    app.listen(5000);
  })
  .catch((err) => console.log("Error"));
