const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Users = require('./users');
const Groups = require('./groups');

const GroupMembers = sequelize.define('groupmembers', {
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: Groups,
            key: 'groupId'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
});

module.exports = GroupMembers;
