const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const attributeDateMap = require('./maps/attribute-date.map');

const AttributeDateValue = require('./attribute-date-value.model');

module.exports = {};

const AttributeDate = databaseManager.context.define('attributeDate', {
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
  MinDate: {
    allowNull: true,
    type:  Sequelize.DATE
  },
  MaxDate: {
    allowNull: true,
    type:  Sequelize.DATE
  },
  Required: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},{
  instanceMethods: {
    getMap: function() {
      return AttributeDate.getMap();
    }
  },
});

AttributeDate.Values = AttributeDate.hasMany(AttributeDateValue, {
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
AttributeDate.getMap = function () {
  return attributeDateMap;
};

module.exports = AttributeDate;
