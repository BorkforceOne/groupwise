const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const validationTokenMap = require('./maps/validation-token.map');

module.exports = {};

/**
 * A Validation Token model
 * @type {*}
 */
const ValidationToken = databaseManager.context.define('validationToken', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Token: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING
  },
  Type: {
    allowNull: false,
    type: Sequelize.ENUM("REGISTRATION", "FORGOT_PASSWORD")
  },
},{
  instanceMethods: {
    getMap: function() {
      return ValidationToken.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
ValidationToken.getMap = function () {
  return validationTokenMap;
};

module.exports = ValidationToken;
