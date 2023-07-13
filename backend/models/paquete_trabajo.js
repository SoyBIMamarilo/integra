const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const PaqueteTrabajo = sequelize.define(
  "paquete_trabajo",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_at: "TIMESTAMP",
    nombre: DataTypes.TEXT,
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = PaqueteTrabajo;
