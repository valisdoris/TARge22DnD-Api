const {db} = require("../db");
const Timeslot = db.timeslot


getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encryption ? "https:" : "http") +
    `://${request.headers.host}`
  )
}

exports.getAll = async (req, res) => {
  try {
    const timeslots = await Timeslot.findAll({ attributes: ["id", "date", "times"] });
    console.log('Timeslots from database:', timeslots);
    res.send(timeslots);
  } catch (error) {
    console.error('Error fetching timeslots:', error);
    res.status(500).send({ error: "Something went wrong" });
  }
}

exports.getById = async (req, res) => {
  const timeslots = await Timeslot.findByPk(req.params.id)
  res.send(timeslots)
}

exports.updateById = async (req, res) => {
  let result
  delete req.body.id
  try {
    result = await Timeslot.update(req.body,{where: {id: req.params.id}})
  } catch (error) {
    console.log("TimeslotUpdate: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
    return
}
if (result === 0){
  res.status(404).send({error:"Timeslot not found"})
  return
}
  const timeslot = await Timeslot.findByPk(req.params.id)
  res.status(200).location(`${getBaseUrl(req)}/timeslot/${timeslot.id}`)
  .json(timeslot)
}

exports.createNew = async (req, res) => {
  let timeslot

  try {
    timeslot = await Timeslot.create(req.body)
  } catch (error) {
    if(error instanceof db.Sequelize.ValidationError){
      console.log(error)
      res.status(400).send({"error":error.errors.map((item)=> item.message)})
    } else {
    console.log("TimeslotCreate: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
  }
  return
}
  res.status(201).location(`${getBaseUrl(req)}/timeslot/${timeslot.id}`).json(timeslot)
  console.log(timeslot)
  res.send(timeslot)
}



exports.deleteById = async (req, res) => {
  let result

  try {
    result = await Timeslot.destroy({where: {id: req.params.id}})
  } catch (error) {
    console.log("TimeslotsDelete: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
  return
}

if (result === 0){
  res.status(404).send({error:"Timeslot not found"})
  return
}
  res.status(204).send()
}

