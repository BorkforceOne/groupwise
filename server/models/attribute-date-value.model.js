const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const AttributeDateValueMap = require('./maps/attribute-date-value.map');

module.exports = {};

const AttributeDateValue = databaseManager.context.define('attributeDateValue', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Value: {
    allowNull: false,
    type:  Sequelize.DATE
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
      return AttributeDateValue.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
AttributeDateValue.getMap = function () {
  return AttributeDateValueMap;
};

module.exports = AttributeDateValue;
