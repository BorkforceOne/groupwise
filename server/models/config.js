/**
 * Created by Brandon Garling on 12/4/2016.
 */
const Sequelize = require('sequelize');
const database = require('../user_modules/database');

module.exports = {};

/**
 * A Config model, this holds user information
 * @type {*}
 */
const Config = database.sequelize.define('config', {
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
    getSerializableFields: function() {
      return Config.getSerializableFields();
    }
  },
});

/**
 * The fields that should be serialized and sent to the client
 * @returns {[string]}
 */
Config.getSerializableFields = function () {
  return ['Key', {name: 'Value', type: 'JSON'}, 'createdAt', 'updatedAt'];
};

module.exports = Config;
