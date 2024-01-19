const serviceController = require('../controllers/serviceController');
const timeslotController = require('../controllers/timeslotController');


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
}