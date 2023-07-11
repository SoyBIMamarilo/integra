const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Ciudad = sequelize.define("ciudad", {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  created_at: Sequelize.DATE,
  nombre: Sequelize.STRING,
});

module.exports = Ciudad;
