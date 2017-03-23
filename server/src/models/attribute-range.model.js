const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const attributeRangeMap = require('./maps/attribute-range.map');

const AttributeRangeValue = require('./attribute-range-value.model');

module.exports = {};

const AttributeRange = databaseManager.context.define('attributeRange', {
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
  Min: {
    allowNull: true,
    type:  Sequelize.FLOAT
  },
  Max: {
    allowNull: true,
    type:  Sequelize.FLOAT
  },
  isInt: {
    allowNull: false,
    type: Sequelize.BOOLEAN
  }
},{
  instanceMethods: {
    getMap: function() {
      return AttributeRange.getMap();
    }
  },
});

AttributeRange.Values = AttributeRange.hasMany(AttributeRangeValue, {
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
AttributeRange.getMap = function () {
  return attributeRangeMap;
};

module.exports = AttributeRange;
