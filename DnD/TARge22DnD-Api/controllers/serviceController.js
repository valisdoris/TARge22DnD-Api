// require("dotenv").config()
const {db} = require("../db");
const Service = db.services

getBaseUrl = (request) => {
  return (
    (request.connection  && request.connection.encryption ? "https" : "http") +
    `://${request.headers.host}`
  )
} 

exports.getAll = async (req,res) => {
  //const services = await  db.sequelize.query('SELECT * FROM services', {type: db.sequalize.QueryTypes.SELECT}
  
  
  const services = await Service.findAll({attributes:["id", "name", "price", "description"]})

  res.send(services)
}

exports.getById = async (req, res) => {
  const services = await Service.findByPk(req.params.id)
  res.send(services)
}

exports.createNew = async (req, res) => {
  let service

  try {
    service = await Service.create(req.body)
  } catch (error) {
    if(error instanceof db.Sequelize.ValidationError){
      console.log(error)
      res.status(400).send({"error":error.errors.map((item)=> item.message)})
    } else {
    console.log("ServicesCreate: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
  }
  return
}
  res.status(201).location(`${getBaseUrl(req)}/services/${service.id}`).json(service)
  console.log(service)
  res.send(service)
}

exports.deleteById = async (req, res) => {
  let result
  try {
    result = await Service.destroy({where: {id: req.params.id}})
  } catch (error) {
    console.log("ServicesDelete: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
  return
}
if (result === 0){
  res.status(404).send({error:"Service not found"})
  return
}
  res.status(204).send()
}

exports.updateById = async (req, res) => {
  let result
  delete req.body.id
  try {
    result = await Service.update(req.body,{where: {id: req.params.id}})
  } catch (error) {
    console.log("ServicesUpdate: ", error)
    res.status(500).send({"error":"Something has gone wrong"})
    return
}
if (result === 0){
  res.status(404).send({error:"Service not found"})
  return
}
  const service = await Service.findByPk(req.params.id)
  res.status(200).location(`${getBaseUrl(req)}/services/${service.id}`)
  .json(service)
}

