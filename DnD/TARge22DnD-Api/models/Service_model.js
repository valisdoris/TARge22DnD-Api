const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
  const Service = sequelize.define("service", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Service
}
