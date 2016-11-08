/**
 * Created by Brandon Garling on 11/5/2016.
 */
const Sequelize = require('sequelize');
const database = require('../user_modules/database');
const encryption = require('../user_modules/encryption');

module.exports = {};

/**
 * A User model, this holds user information
 * @type {*}
 */
const User = database.sequelize.define('user', {
  Firstname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  Lastname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  Email: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  Password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  Salt: {
    allowNull: false,
    type: Sequelize.STRING
  }
},{
  instanceMethods: {
    getSerializableFields: function() {
      return User.getSerializableFields();
    },
    changePassword: function(password) {
      return new Promise(function (resolve, reject) {
        encryption.generateSalt()
          .then(function (salt) {
            this['Salt'] = salt;
            encryption.generateHash(password, salt)
              .then(function (hash) {
                this['Password'] = hash;
                resolve(true);
              }.bind(this));
          }.bind(this));
      }.bind(this));
    }
  },
});

/**
 * The fields that should be serialized and sent to the client
 * @returns {[string]}
 */
User.getSerializableFields = function () {
  return ['id', 'Firstname', 'Lastname', 'Email', 'createdAt', 'updatedAt'];
};

module.exports = User;
