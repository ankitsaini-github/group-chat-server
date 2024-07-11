const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isProUser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Users;