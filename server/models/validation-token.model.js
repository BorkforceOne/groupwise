const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');
const crypto = require('crypto');

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
  Code: {
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
    generateCode: function() {
      return ValidationToken.generateCode();
    }
  },
});

ValidationToken.generateCode = function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(8, function(ex, buf) {
      resolve(buf.toString('hex'));
    });
  });
};

module.exports = ValidationToken;
