const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Users = require('./users');

const Groups = sequelize.define('groups', {
    groupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
});

module.exports = Groups;
