/**
 * Created by Brandon Garling on 11/5/2016.
 */
const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');
const encryptionManager = require('../user_modules/encryption-manager');
const mailerManager = require('../user_modules/mailer-manager');
const userMap = require('./maps/user.map');
const config = require('../config');

const Attachment = require('./attachment.model');
const ValidationToken = require('./validation-token.model');
const StudentProfile = require('./student-profile.model');
const HostProfile = require('./host-profile.model');
const AttributeStringValue = require('./attribute-string-value.model');
const AttributeDateValue = require('./attribute-date-value.model');

module.exports = {};

/**
 * A User model, this holds user information
 * @type {*}
 */
const User = databaseManager.context.define('user', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Firstname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  Lastname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  Age: {
    allowNull: true,
    type:  Sequelize.INTEGER
  },
  Gender: {
    allowNull: true,
    type: Sequelize.ENUM("MALE", "FEMALE", "OTHER")
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
  ReceiveGeneralNotifications: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  ReceiveNewMatchNotifications: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  ReceiveMessageNotifications: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},{
  instanceMethods: {
    getMap: function() {
      return User.getMap();
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
    },
    validateEmail: function() {
      return new Promise((resolve, reject) => {

        ValidationToken.generateCode()
          .then(validationToken => ValidationToken.create({
            UserId: this.Id,
            Type: 'REGISTRATION',
            Token: validationToken
          }))
          .then((validationToken) => {
            let mail = mailerManager.templates.validateEmail;

            let header = {
              to: this.Email
            };

            let params = {
              Firstname: this.Firstname,
              Lastname: this.Lastname,
              VerificationURL: config.general.baseURL + '/validate?code=' + validationToken.Code
            };

            mailerManager.sendMail(mail, header, params)
              .then(() => resolve(this))
              .catch((error) => reject(error));
          })
      })
    }
  },
});

User.Attachments = User.hasMany(Attachment, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  },
  as: 'Attachments'
});

User.ValidationTokens = User.hasMany(ValidationToken, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  },
  as: 'ValidationTokens'
});

User.AttributeStringValues = User.hasMany(AttributeStringValue, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  },
  as: 'AttributeStringValues'
});

User.AttributeDateValues = User.hasMany(AttributeDateValue, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  },
  as: 'AttributeDateValues'
});

User.StudentProfile = User.hasOne(StudentProfile, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  },
  as: 'StudentProfile'
});

User.HostProfile = User.hasOne(HostProfile, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  },
  as: 'HostProfile'
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
User.getMap = function () {
  return userMap;
};

module.exports = User;

