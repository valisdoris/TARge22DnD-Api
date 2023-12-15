// require("dotenv").config()

const {db} = require("../db");
const Service = db.services

exports.getAll = async (req,res) => {
  const services = await Service.findAll({attributes:["name"]})
  res.send(services)
}

// exports.getAll = async (req,res) => {
//   let connection
//   try {
//     connection = await pool.getConnection();
//     const rows = await connection.query("SELECT id, name FROM services")
//     res.send(rows)
//   } catch (error) {
//     throw error
//   } finally {
//     if (connection) return connection.end()
//   }
// }