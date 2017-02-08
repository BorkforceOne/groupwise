const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const attributeStringValueMap = require('./maps/attribute-string-value.map');

module.exports = {};

const AttributeStringValue = databaseManager.context.define('attributeStringValue', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Value: {
    allowNull: false,
    type:  Sequelize.STRING
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
      return AttributeStringValue.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
AttributeStringValue.getMap = function () {
  return attributeStringValueMap;
};

module.exports = AttributeStringValue;
