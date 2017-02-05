/**
 * Created by Brandon Garling on 11/5/2016.
 */
const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const studentProfileMap = require('./maps/student-profile.map');

module.exports = {};

/**
 * A StudentProfile model, this holds user information
 * @type {*}
 */
const StudentProfile = databaseManager.context.define('studentProfile', {
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
  Citizenship: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  Languages: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  NAUStartDate: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  Major: {
    allowNull: true,
    type:  Sequelize.STRING
  },
  StudentClassification: {
    allowNull: true,
    type: Sequelize.ENUM("PIE", "UNDERGRADUATE", "GRADUATE"),
  },
  PreferredHostType: {
    allowNull: true,
    type: Sequelize.ENUM("FAMILY", "COUPLE", "SINGLE")
  },
  PreferredHostAlcohol: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  },
  PreferredHostSmoke: {
    allowNull: true,
    type:  Sequelize.BOOLEAN
  }
},{
  instanceMethods: {
    getMap: function() {
      return StudentProfile.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
StudentProfile.getMap = function () {
  return studentProfileMap;
};

module.exports = StudentProfile;
