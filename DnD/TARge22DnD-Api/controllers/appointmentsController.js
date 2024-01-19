const {db} = require('../db');
const Appointments = db.appointments
const service = db.services.appointments

exports.getAll = async (req, res) => {
  const appointments = await appointments.findAll({
    include: {all: true},
    logging: console.log
  })
  console.log(appointments);
  let result = []
  result = appointments.map((app) => {
    return {
      "service": app.serviceName
    }
  })
}