const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const AttributeRangeValueMap = require('./maps/attribute-range-value.map');

module.exports = {};

const AttributeRangeValue = databaseManager.context.define('attributeRangeValue', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Value: {
    allowNull: false,
    type:  Sequelize.FLOAT
  },
  AttributeId: {
    type: Sequelize.INTEGER,
    unique: 'User_Attribute_unique',
  },
  UserId: {
    type: Sequelize.INTEGER,
    unique: 'User_Attribute_unique',
  }
},{
  instanceMethods: {
    getMap: function() {
      return AttributeRangeValue.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
AttributeRangeValue.getMap = function () {
  return AttributeRangeValueMap;
};

module.exports = AttributeRangeValue;
