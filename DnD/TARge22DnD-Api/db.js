const Sequelize = require('sequelize');
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

//db.clients = require("./models/Client_models")(sequelize, Sequelize);
db.timeslots = require("./models/Timeslot_models")(sequelize, Sequelize);
db.appointment = require("./models/Appointment_models")(sequelize, Sequelize, db.services, db.timeslots);

async function Sync() {
  await sequelize.sync({alter:true})
}

module.exports = { db, Sync };