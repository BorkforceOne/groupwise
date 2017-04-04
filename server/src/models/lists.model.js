/**
 *
 */
const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');
const listMap = require('./maps/lists.map');
const config = require('../config');


module.exports = {};

/**
 * A list model, this holds list information for whitelist and blacklist
 * @type {*}
 */
const Lists = databaseManager.context.define('list', {
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Type: {
        type: Sequelize.ENUM("WHITELIST", "BLACKLIST"),
        allowNull: false
    },
    Email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    }
},{
    instanceMethods: {
        getMap: function() {
            return Lists.getMap();
        }
    },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
Lists.getMap = function () {
    return listMap;
};

module.exports = Lists;

