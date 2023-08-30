const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Indicador = sequelize.define(
  "indicador",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    descripcion: DataTypes.TEXT,
    abreviatura: DataTypes.TEXT,
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = Indicador;
