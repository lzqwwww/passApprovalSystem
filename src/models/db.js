const mysql = require("mysql")
const dbConfig = require("../config/db.config")

var connection = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PWD,
  database: dbConfig.DB,
})
module.exports = connection
