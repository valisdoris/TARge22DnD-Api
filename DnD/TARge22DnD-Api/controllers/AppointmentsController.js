const {db} = require('../db')
const Appointment = db.appointment
const Timeslot = db.timeslot

exports.createNewAppointment = async (req, res) => {
  try {

      // Create a new booking
      const appointment = await Appointment.create({
          servicesID: req.body.servicesId,
          resDate: req.body.resDate,
          resTime: req.body.resTime,
          name: req.body.name,
          email: req.body.email,
          Status: req.body.Status,

      });
      res.status(201).json({ success: true, appointmentId: appointment.Id });

    } catch (error) {
      console.error(error);
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error);
            res.status(400).send({ "error": error.errors.map((item) => item.message) });
        } else {
            console.log("Appointment created: ", error);
            res.status(500).send({ error: "Something has gone wrong" });
        }
    }
};
exports.getAll = async (_, res) => {
  const appointment = await Appointment.findAll({attributes:["Id", "servicesId", "resDate", "resTime", "name", "email","Status"]
})
  res.send(appointment);
}

exports.getById = async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id)
  res.send(appointment);
}

exports.createNew = async (req, res) => {
  let appointment

  try {
    appointment = await Appointment.create(req.body)
  } catch (error) {
    if(error instanceof db.Sequelize.ValidationError){
      console.log(error)
      res.status(400).send({"error":error.errors.map((item)=> item.message)})
    } else {
    console.log("AppointmentCreate: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
  }
  return
}
  res.status(201).location(`${getBaseUrl(req)}/appointment/${appointment.id}`).json(appointment)
  console.log(appointment)
  res.send(appointment)
}

exports.deleteById = async (req, res) => {
  let result
  try {
    result = await Appointment.destroy({where: {id: req.params.id}})
  } catch (error) {
    console.log("AppointmentDelete: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
  return
}
if (result === 0){
  res.status(404).send({error:"Appointment not found"})
  return
}
  res.status(204).send()
}

exports.updateById = async (req, res) => {
  let result
  delete req.body.id
  try {
    result = await Appointment.update(req.body,{where: {id: req.params.id}})
  } catch (error) {
    console.log("AppointmentUpdate: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
    return
}
if (result === 0){
  res.status(404).send({error:"Appointment not found"})
  return
}
  const appointment = await Appointment.findByPk(req.params.id)
  res.status(200).location(`${getBaseUrl(req)}/appointment/${appointment.id}`)
  .json(appointment)
}

getBaseUrl = (request) => {
  return (
    (request.connection  && request.connection.encryption ? "https" : "http") +
    `://${request.headers.host}`
  )
}