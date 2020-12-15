const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "12345",
  host: "localhost",
  post: 5432,
  database: "login",
});
module.exports = client;
