const serviceController = require('../controllers/serviceController');

module.exports = (app) => {
  app.route("/services").get(serviceController.getAll)
}