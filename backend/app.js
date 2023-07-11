const express = require("express");
require("dotenv").config();

const sequelize = require("./util/database");
const Ciudad = require("./models/ciudad");

const app = express();


app.use((req, res, next) => {
  Ciudad.findAll()
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});


sequelize
  .sync()
  .then((result) => {
    console.log("Conectado");
  })
  .catch((err) => console.log("Error"));
