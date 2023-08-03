const { Sequelize, DataTypes, INTEGER, SMALLINT } = require("sequelize");

const sequelize = require("../util/database");

const ValorPresupuesto = sequelize.define(
  "valor_presupuesto",
  {
    id: { type: DataTypes.SMALLINT, primaryKey: true },
    linea_id: DataTypes.INTEGER,
    parent_id: DataTypes.SMALLINT,
    cbs: DataTypes.TEXT,
    line_type: DataTypes.TEXT,
    sum: DataTypes.NUMBER,
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = ValorPresupuesto;
