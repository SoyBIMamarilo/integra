const { Sequelize, DataTypes, INTEGER, SMALLINT } = require("sequelize");

const sequelize = require("../util/database");

const Item = sequelize.define(
  "item",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    presupuesto_id: DataTypes.INTEGER,
    paquete_trabajo_id: DataTypes.SMALLINT,
    referente_id: DataTypes.TEXT,
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = Item;
