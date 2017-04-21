const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const notificationMap = require('./maps/notification.map');

module.exports = {};

const Notification = databaseManager.context.define('notification', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  UserId: {
    allowNull: false,
    type:  Sequelize.INTEGER
  },
  Type: {
    type: Sequelize.ENUM('NEW_MATCH', 'GENERAL', 'MESSAGE'),
    allowNull: false
  },
  Seen: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Message: {
    allowNull: false,
    type:  Sequelize.TEXT
  }
},{
  instanceMethods: {
    getMap: function() {
      return Notification.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
Notification.getMap = function () {
  return notificationMap;
};

module.exports = Notification;
