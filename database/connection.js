require("dotenv").config();
const ENV = process.env.ENV || "development";
const config = require("../config/config.json");
const { Sequelize } = require("sequelize");
const { username, password, database, host, dialect } = config[ENV];
const sequelize = new Sequelize({
  dialect,
  username,
  host,
  password,
  database,
  pool: {
    min: 0,
    max: 2,
    idle: 0,
    acquire: 10000,
  },
  logging: true,
});

module.exports = { sequelize };
