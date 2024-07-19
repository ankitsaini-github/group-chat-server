const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Groups = require('./groups');
const Users = require('./users');

const ArchivedChats = sequelize.define('archivedchats', {
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
  userId: {
    type: Sequelize.INTEGER,
    references: {
        model: Users,
        key: 'id'
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }
});

module.exports = ArchivedChats;