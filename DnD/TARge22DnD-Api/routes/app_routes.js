const serviceController = require('../controllers/serviceController');
// const serviceController = require('../controllers/timeslotController');

module.exports = (app) => {
  app.route("/services")
      .get(serviceController.getAll)
      .post(serviceController.createNew);

  app.route("/services/:id")
  .get(serviceController.getById)
  .put(serviceController.updateById)
  .delete(serviceController.deleteById);

//   app.route("/timeslot")
//   .get(timeslotController.getAll)

}