const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const attributeStringMap = require('./maps/attribute-string.map');

const AttributeStringValue = require('./attribute-string-value.model');

module.exports = {};

const AttributeString = databaseManager.context.define('attributeString', {
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
  MaxLength: {
    allowNull: true,
    type:  Sequelize.INTEGER
  }
},{
  instanceMethods: {
    getMap: function() {
      return AttributeString.getMap();
    }
  },
});

AttributeString.Values = AttributeString.hasMany(AttributeStringValue, {
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
AttributeString.getMap = function () {
  return attributeStringMap;
};

module.exports = AttributeString;
