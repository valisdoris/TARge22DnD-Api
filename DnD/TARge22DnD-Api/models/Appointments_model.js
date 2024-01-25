module.exports = (sequelize, Sequelize, Service) => {
  const Appointment = sequelize.define("appointment", {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    servicesId: {
      type: Sequelize.INTEGER,
      references: {
        model: Service,
        key: "id",
      }
      
    },
    resDate: {
        type: Sequelize.DATE,
        allowNull: true
    }, 
    resTime: {
      type: Sequelize.TIME,
      allowNull: true
  }, 
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })

  
  Service.hasMany(Appointment);
  Appointment.belongsTo(Service);


  return Appointment
}