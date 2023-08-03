const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Proyecto = require("./proyecto");

const Presupuesto = sequelize.define(
  "presupuesto",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_at: "TIMESTAMP",
    version: DataTypes.SMALLINT,
    proyecto_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Proyecto,
        key: "id",
      },
    },
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = Presupuesto;
