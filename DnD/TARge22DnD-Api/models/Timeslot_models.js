module.exports = (sequelize, Sequelize) => {
  const Timeslot = sequelize.define("timeslot", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    times: {
      type: Sequelize.SET("9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"),
      allowNull: true
    }
  })

  return Timeslot
}