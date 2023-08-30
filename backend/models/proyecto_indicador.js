const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Proyecto = require("./proyecto");
const Indicador = require("./indicadores");

const ProyectoIndicador = sequelize.define(
  "proyecto_indicador",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_at: "TIMESTAMP",
    proyecto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Proyecto,
        key: "id",
      },
    },
    indicador_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Indicador,
        key: "id",
      },
    },
    valor: DataTypes.NUMBER,
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = ProyectoIndicador;
