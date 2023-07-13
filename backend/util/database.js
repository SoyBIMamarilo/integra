const { Sequelize } = require("sequelize");

SUPBASE_PASSWORD = process.env.SUPBASE_PASSWORD;

const sequelize = new Sequelize(
  `postgresql://postgres:${SUPBASE_PASSWORD}@db.kfkiyhtoznvoealcynsj.supabase.co:5432/postgres`,
  {
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize;
