const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const matchMap = require('./maps/match.map');

module.exports = {};

const Match = databaseManager.context.define('match', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  HostUserId: {
    unique: 'User_Host_unique',
    allowNull: false,
    type:  Sequelize.INTEGER
  },
  StudentUserId: {
    unique: 'User_Student_unique',
    allowNull: false,
    type:  Sequelize.INTEGER
  },
  Status: {
    allowNull: false,
    type:  Sequelize.ENUM("PROPOSED", "APPROVED", "REJECTED")
  }
},{
  instanceMethods: {
    getMap: function() {
      return Match.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
Match.getMap = function () {
  return matchMap;
};

module.exports = Match;
