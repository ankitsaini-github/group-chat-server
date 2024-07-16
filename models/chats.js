const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Groups = require('./groups');

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
  },
  groupId: {
    type: Sequelize.INTEGER,
    references: {
        model: Groups,
        key: 'groupId'
    }
},
});

module.exports = Chats;