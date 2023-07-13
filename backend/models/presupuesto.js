const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Presupuesto = sequelize.define(
  "presupuesto",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_at: "TIMESTAMP",
    version: DataTypes.SMALLINT,
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = Presupuesto;
