module.exports = (sequelize, Sequelize, Service, Client, Timeslot) => {
  const Appointment = sequelize.define("appointment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceId: {
      type: Sequelize.INTEGER,
      references: {
        model: Service,
        key: "id",
      }
      
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {
        model: Client,
        key: "id",
      }
    },
    timeslotId: {
      type: Sequelize.INTEGER,
      references: {
        model: Timeslot,
        key: "id",
      }
    }
  })

  Service.belongsToMany(Client, {through: Appointment})
  Client.belongsToMany(Timeslot, {through: Appointment})
  Timeslot.belongsToMany(Service, {through: Appointment})
  // Timeslot.belongsToMany(Client, {through: Appointment})
  // Client.belongsToMany(Service, {through: Appointment})
  // Service.belongsToMany(Timeslot, {through: Appointment})
  return Appointment
}