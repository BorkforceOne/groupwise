const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const hostProfileMap = require('./maps/host-profile.map');

module.exports = {};

/**
 * A Host Profile model, this holds user information
 * @type {*}
 */
const HostProfile = databaseManager.context.define('hostProfile', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Smoke: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  Alcohol: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  Car: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  Married: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  AlreadyHosting: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  Phone: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  Allergies: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  Distance: {
    allowNull: true,
    type:  Sequelize.INTEGER
  },
  ChildrenName: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  ChildrenGender: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  ChildrenAge: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  Hobbies: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  Rules: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  PreferredGender: {
    allowNull: true,
    type: Sequelize.ENUM("MALE", "FEMALE", "NO_PREFERENCE")
  },
  PreferredCountry: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  NoStudentFromCountryStillAssign: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  MarriedOk: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  MarriedWithChildrenOk: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  }
},{
  instanceMethods: {
    getMap: function() {
      return HostProfile.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
HostProfile.getMap = function () {
  return hostProfileMap;
};

module.exports = HostProfile;
