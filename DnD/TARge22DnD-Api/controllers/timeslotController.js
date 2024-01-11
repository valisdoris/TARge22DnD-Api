const {db} = require("../db");
const Timeslot = db.services

exports.getAll = async (req,res) => {
  const timeslots = await Timeslot.findAll({attributes:["id", "date", "times"],
});
  res.send(timeslots)
}

getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encryption ? "https:" : "http") +
    `://${request.headers.host}`
  )
}