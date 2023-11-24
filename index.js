const app = require('express')()
const port = 8090
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

app.get('/services', (req, res) => {
  res.send(["Pedicure with gel polish", "Manicure with gel polish", "Classic manicure"])
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`Api up at: http://localhost:${port}`)
})