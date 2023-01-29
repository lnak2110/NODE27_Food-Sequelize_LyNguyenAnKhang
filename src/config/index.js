require('dotenv').config();

module.exports = {
  dbDatabase: process.env.DB_DATABASE,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
};
