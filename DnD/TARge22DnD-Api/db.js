const Sequelize = require('sequelize');
const ServiceModel = require('./models/Service_model');
const TimeslotModel = require('./models/Timeslot_models');
const AppointmentsModel = require('./models/Appointments_model');
const sequelize = new Sequelize(
  process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: false
    }
  }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.services = require("./models/Service_model")(sequelize, Sequelize);
db.timeslot = require("./models/Timeslot_models")(sequelize, Sequelize);
//db.appointment = require("./models/Appointment_model")(sequelize, Sequelize, db.services);
db.appointment = require("./models/Appointments_model")(sequelize, Sequelize, db.services)
async function Sync() {
  await sequelize.sync({alter:true})
}

module.exports = { db, Sync };