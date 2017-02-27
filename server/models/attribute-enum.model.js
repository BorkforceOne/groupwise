const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const attributeEnumMap = require('./maps/attribute-enum.map');

const AttributeEnumValue = require('./attribute-enum-value.model');

module.exports = {};

const AttributeEnum = databaseManager.context.define('attributeEnum', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    unique: true,
    allowNull: false,
    type:  Sequelize.STRING
  },
  Description: {
    allowNull: false,
    type:  Sequelize.STRING
  },
  Question: {
    allowNull: false,
    type:  Sequelize.STRING
  },
  ForType: {
    allowNull: false,
    type:  Sequelize.ENUM("STUDENT", "HOST", "BOTH")
  },
  MaxSelect: {
    allowNull: true,
    type:  Sequelize.INTEGER
  },
  MinSelect: {
    allowNull: true,
    type:  Sequelize.INTEGER
  },
  SelectType: {
    allowNull: false,
    type: Sequelize.ENUM("DROPDOWN", "RADIO")
  },
  Options: {
    allowNull: false,
    type: Sequelize.TEXT
  }
},{
  instanceMethods: {
    getMap: function() {
      return AttributeEnum.getMap();
    }
  },
});

AttributeEnum.Values = AttributeEnum.hasMany(AttributeEnumValue, {
  foreignKey: {
    name: 'AttributeId',
    allowNull: false
  },
  as: 'Values'
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
AttributeEnum.getMap = function () {
  return attributeEnumMap;
};

module.exports = AttributeEnum;
