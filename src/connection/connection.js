const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.db_HOST,
  user: process.env.db_USER,
  port: process.env.db_PORT,
  password: process.env.db_PASS,
  database: process.env.db_DB,
});

module.exports = client;
