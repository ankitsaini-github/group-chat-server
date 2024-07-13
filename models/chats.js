const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Chats = sequelize.define('chats', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  sender: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Chats;