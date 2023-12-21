module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true
    },
    clientId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true
    },
    timeslotId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: true
    }
  })

  return Appointment
}