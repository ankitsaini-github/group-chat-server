const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Users = require('./users');
const Groups = require('./groups');

const GroupMembers = sequelize.define('groupmembers', {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
});

module.exports = GroupMembers;
