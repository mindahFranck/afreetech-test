const { Sequelize } = require("sequelize");


export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});
