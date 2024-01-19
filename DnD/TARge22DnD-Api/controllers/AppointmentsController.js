const {db} = require('../db')
const Appointments = db.appointments
const Service = db.services
const Timeslot = db.timeslots
// const QueryTypes = db.Sequelize.QueryTypes

exports.getAll = async (req, res) => {
  const appointments = await Appointments.findAll({
    include: {all: true},
    logging: console.log
  })
  console.log(appointments);
  let result = []
  result = appointments.map((ap) => {
    return {
      "serviceName": ap.service.name,
      "timeslot": `${ap.timeslot.date}`,
      }
  })
  res.send(result)
}