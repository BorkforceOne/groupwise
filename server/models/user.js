/**
 * Created by Brandon Garling on 11/5/2016.
 */
const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');
const encryptionManager = require('../user_modules/encryption-manager');

const Attachment = require('./attachment');

module.exports = {};

/**
 * A User model, this holds user information
 * @type {*}
 */
const User = databaseManager.context.define('user', {
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
  },
  Type: {
    allowNull: false,
    type: Sequelize.ENUM('HOST', 'STUDENT', 'ADMINISTRATOR')
  },
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
},{
  instanceMethods: {
    getSerializableFields: function() {
      return User.getSerializableFields();
    },
    changePassword: function(password) {
      return new Promise((resolve, reject) => {
        encryptionManager.generateSalt()
          .then(salt => {
            this['Salt'] = salt;
          })
          .then(() => {
            return encryptionManager.generateHash(password, this['Salt']);
          })
          .then(hash => {
            this['Password'] = hash;
            resolve(this);
          })
          .catch(reject);
      });
    }
  },
});

User.hasMany(Attachment, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  }
});

/**
 * The fields that should be serialized and sent to the client
 * @returns {[string]}
 */
User.getSerializableFields = function () {
  return ['Id', 'Firstname', 'Lastname', 'Type', 'Email', 'createdAt', 'updatedAt'];
};

module.exports = User;

