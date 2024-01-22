require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()

const port = 8090
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(cors())
app.use(express.json())

require("./routes/app_routes")(app)
const services = [ 

{id: 1, name: "Pedicure with gel polish", price: 45}, 
{id: 2, name: "Manicure with gel polish", price: 35}, 
{id: 3, name: "Classic manicure", price: 25, description: "Massage, nail polish"},
{id: 4, name: "Classic pedicure", price: 40, description: "Massage, nail polish"},
{id: 5, name: "Application of gel nails", price: 55},
{id: 6, name: "Gel nails care", price: 50},
{id: 7, name: "French Manicure", price: 30},
{id: 8, name: "Removal of gel polish", price: 6},
{id: 9, name: "Medical pedicure", price: 50}
  
]

const timeslot = [
  {id: 1, date: "2024-01-01", times: ["9:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30"]},
  //{id: 2, date: "2024-01-02", times: ["10:30","13:30","16:30","19:30"]},
  //{id: 3, date: "2024-01-03", times: ["9:00","12:00","15:00","18:00"]},
  
]

const appointment = [
  {
    id: 1, serviceId: 1, timeslotId: 1
  } ,
  {
    id: 2, serviceId: 2, timeslotId: 2
  }]

app.get("/errors", async (req, res) => {
  res.statusCode(404).send({"error": "something went wrong"})
})
app.get('/services', (req, res) => {
  res.send(services)
});
app.get('/services/:id', (req, res) => {

  if (typeof services[req.params.id -1] === 'undefined') {
    return res.status(404).send({error:"Service not found"});
  }

  res.send(services[req.params.id -1]);
});

app.post('/services', (req, res) => {
  if (!req.body.name ||!req.body.price) {
    return res.status(400).send({error:"One or all params are missing."})
  }
  let service = {
    id: services.length + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  }
  
  services.push(service)

  res.status(201)
      .location(`${getBaseUrl(req)}/services/${service.length}`)
      .send(service)
})

app.delete('/services/:id', (req, res) => {
  if (typeof services[req.params.id -1] === 'undefined') {
    return res.status(404).send({error:"Service not found"})
  }

  services.splice(req.params.id - 1, 1)

  res.status(204).send({error:"No content"})
})

// app.get('/timeslot', (req, res) => {
//   res.send(timeslot)
// });

app.get('/timeslot', async (req, res) => {
  try {
    const timeslots = await db.timeslot.findAll();
    res.send(timeslots);
  } catch (error) {
    console.error('Error fetching timeslots:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/timeslot/:id', (req, res) => {
  if (typeof timeslot[req.params.id - 1] === 'undefined') {
    return res.status(404).send({ error: "Timeslot not found" });
  }

  res.send(timeslot[req.params.id - 1]);
});

app.post('/timeslot', (req, res) => {
  if (!req.body.date || !req.body.times) {
    return res.status(400).send({ error: "One or all params are missing." });
  }
  let newTimeslot = {
    id: timeslot.length + 1,
    date: req.body.date,
    times: req.body.times
  };

  timeslot.push(newTimeslot);

  res.status(201)
    .location(`${getBaseUrl(req)}/timeslot/${newTimeslot.length}`)
    .send(newTimeslot);
});

app.delete('/timeslot/:id', (req, res) => {
  if (typeof timeslot[req.params.id - 1] === 'undefined') {
    return res.status(404).send({ error: "Timeslot not found" });
  }

  timeslot.splice(req.params.id - 1, 1);

  res.status(204).send({ error: "No content" });
});

app.get('/appointment', (req, res) => {
  res.send(appointment)
});
app.get('/appointment/:id', (req, res) => {

  if (typeof appointment[req.params.id -1] === 'undefined') {
    return res.status(404).send({error:"Appointment not found"});
  }
  res.send(appointment[req.params.id -1]);

});

app.post('/appointment', (req, res) => {
  if (!req.body.name ||!req.body.price) {
    return res.status(400).send({error:"One or all params are missing."})
  }
  const newAppointment = {
    id: appointment.length + 1,
    name: req.body.name,
    servicesID: req.body.servicesID,
    resDate: req.body.resDate,
    resTime: req.body.resTime,
    email: req.body.email,
    Status: req.body.Status,
  };
  
  appointment.push(newAppointment)

  res.status(201)
      .location(`${getBaseUrl(req)}/appointment/${appointment.length}`)
      .send(appointment)
})

app.delete('/appointment/:id', (req, res) => {
  if (typeof appointment[req.params.id -1] === 'undefined') {
    return res.status(404).send({error:"Appointment not found"})
  }

  appointment.splice(req.params.id - 1, 1)

  res.status(204).send({error:"No content"})
})


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, async () => {
  console.log(`Api up at: http://localhost:${port}`)
})

function getBaseUrl(req) {
  return req.connection && req.connection.encrypted
  ? 'https' : 'http' + `://${req.headers.host}`
}


