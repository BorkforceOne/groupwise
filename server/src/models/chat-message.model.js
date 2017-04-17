const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const chatMessageMap = require('./maps/chat-message.map');

module.exports = {};

const ChatMessage = databaseManager.context.define('chatMessage', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  To: {
    allowNull: false,
    type:  Sequelize.INTEGER
  },
  From: {
    allowNull: false,
    type:  Sequelize.INTEGER
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
      return ChatMessage.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
ChatMessage.getMap = function () {
  return chatMessageMap;
};

module.exports = ChatMessage;
