const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const attributeEnumValueMap = require('./maps/attribute-enum-value.map');

module.exports = {};

const AttributeEnumValue = databaseManager.context.define('attributeEnumValue', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Value: {
    allowNull: false,
    type:  Sequelize.TEXT
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
      return AttributeEnumValue.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
AttributeEnumValue.getMap = function () {
  return attributeEnumValueMap;
};

module.exports = AttributeEnumValue;
