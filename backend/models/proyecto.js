const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Ciudad = require("./ciudad");

const Proyecto = sequelize.define(
  "proyecto",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_at: "TIMESTAMP",
    nombre: DataTypes.TEXT,
    ciudad_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Ciudad,
        key: "id",
      },
    },
  },
  { schema: "presupuesto", freezeTableName: true }
);

module.exports = Proyecto;
