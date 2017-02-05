/**
 * Created by Brandon Garling on 12/4/2016.
 */
const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');
const configMap = require('./maps/config.map');

module.exports = {};

/**
 * A Config model, this holds user information
 * @type {*}
 */
const Config = databaseManager.context.define('config', {
  Key: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.STRING
  },
  Value: {
    allowNull: false,
    type: Sequelize.STRING
  }
},{
  instanceMethods: {
    getMap: function() {
      return Config.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
Config.getMap = function () {
  return configMap;
};

module.exports = Config;

