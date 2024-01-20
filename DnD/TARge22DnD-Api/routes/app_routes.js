const serviceController = require('../controllers/serviceController');
const timeslotController = require('../controllers/timeslotController');
const appointmentsController = require('../controllers/AppointmentsController');


// const serviceController = require('../controllers/timeslotController');

module.exports = (app) => {
  app.route("/services")
      .get(serviceController.getAll)
      .post(serviceController.createNew);

  app.route("/services/:id")
  .get(serviceController.getById)
  .put(serviceController.updateById)
  .delete(serviceController.deleteById);


  app.route("/timeslots")
      .get(timeslotController.getAll)
      .post(timeslotController.createNew);

  app.route("/timeslots/:id")
  .get(timeslotController.getById)
  .put(timeslotController.updateById)
  .delete(timeslotController.deleteById);


  app.route("/appointments")
  .get(appointmentsController.getAll)
  .post(appointmentsController.createNew);

  app.route("/appointments/:id")
  .get(appointmentsController.getById)
  .put(appointmentsController.updateById)
  .delete(appointmentsController.deleteById);
}