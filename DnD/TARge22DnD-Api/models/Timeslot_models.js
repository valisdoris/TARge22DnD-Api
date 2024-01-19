const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
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
      type: Sequelize.ENUM,
      allowNull: true,
      values: ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"]
    }
  })

  return Timeslot
}