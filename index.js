const express = require('express')
const app = express()
const port = 8090
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(express.json())

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
app.get('/services', (req, res) => {
  res.send(services)
})
app.get('/services/:id', (req, res) => {

  if (typeof services[req.params.id -1] === 'undefined') {
    return res.status(404).send({error:"Service not found"});
  }

  res.send(services[req.params.id -1]);
  // const service = services.filter( s => (s.id == req.params.id))[0];

  // res.send(service);
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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`Api up at: http://localhost:${port}`)
})

function getBaseUrl(req) {
  return req.connection && req.connection.encrypted
  ? 'https' : 'http' + `://${req.headers.host}`
}