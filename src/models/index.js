const { Sequelize } = require('sequelize');
const {
  dbDatabase,
  dbUser,
  dbPass,
  dbHost,
  dbPort,
  dbDialect,
} = require('../config');
const initModels = require('../models/init-models');

const sequelize = new Sequelize(dbDatabase, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect, // Hệ CSDL đang sử dụng
  timezone: '+07:00',
});

const models = initModels(sequelize);

module.exports = models;
