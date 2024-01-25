// module.exports = (sequelize, Sequelize, Service) => {
//   const Appointment = sequelize.define("appointment", {
//     Id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     servicesId: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: Service,
//         key: "id",
//       }
      
//     },
//     resDate: {
//         type: Sequelize.DATE,
//         allowNull: false
//     }, 
//     resTime: {
//       type: Sequelize.TIME,
//       allowNull: false
//   }, 
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     Status: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }

//   // })

//   //Service.belongsToMany(Timeslot, { through: Appointment, foreignKey: 'serviceId' });
//   // Timeslot.belongsToMany(Service, { through: Appointment, foreignKey: 'timeslotId' });

//   Service.hasMany(Appointment);
//   Appointment.belongsTo(Service);

//   // Timeslot.hasMany(Appointment);
//   // Appointment.belongsTo(Timeslot);

//   return Appointment
// }