const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Presupuesto = require("./presupuesto");
const PaqueteTrabajo = require("./paquete_trabajo");

const PresupuestoPaqueteTrabajo = sequelize.define(
  "presupuesto_paquete_trabajo",
  {
    presupuesto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Presupuesto,
        key: "id",
      },
      primaryKey: true,
    },
    paquete_trabajo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PaqueteTrabajo,
        key: "id",
      },
      primaryKey: true,
    },
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = PresupuestoPaqueteTrabajo;
