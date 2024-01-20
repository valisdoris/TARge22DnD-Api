module.exports = (sequelize, Sequelize, Service, Timeslot) => {
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
    timeslotId: {
      type: Sequelize.INTEGER,
      references: {
        model: Timeslot,
        key: "id",
      }

    }
  })

  // Service.belongsToMany(Timeslot, { through: Appointment, foreignKey: 'serviceId' });
  // Timeslot.belongsToMany(Service, { through: Appointment, foreignKey: 'timeslotId' });

  // Service.hasMany(Appointment);
  // Appointment.belongsTo(Service);

  // Timeslot.hasMany(Appointment);
  // Appointment.belongsTo(Timeslot);

  return Appointment
}