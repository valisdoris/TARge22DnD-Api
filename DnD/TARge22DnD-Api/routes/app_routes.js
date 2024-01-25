const serviceController = require('../controllers/serviceController');
const timeslotController = require('../controllers/timeslotController');
const appointmentsController = require('../controllers/appointmentController');


module.exports = (app) => {
  app.route("/services")
      .get(serviceController.getAll)
      .post(serviceController.createNew);

  app.route("/services/:id")
  .get(serviceController.getById)
  .put(serviceController.updateById)
  .delete(serviceController.deleteById);


  app.route("/timeslot")
      .get(timeslotController.getAll)
      .post(timeslotController.createNew);

  app.route("/timeslot/:id")
  .get(timeslotController.getById)
  .put(timeslotController.updateById)
  .delete(timeslotController.deleteById);


  app.route("/appointments")
  .get(appointmentsController.getAll)
  .post(appointmentsController.createNewAppointment);

  app.route("/appointments/:id")
  .get(appointmentsController.getById)
  .put(appointmentsController.updateById)
  .delete(appointmentsController.deleteById);
}