/**
 * Created by Brandon Garling on 11/7/2016.
 */
const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const attachmentMap = require('./maps/attachment.map');

module.exports = {};

/**
 * A Attachment model
 * @type {*}
 */
const Attachment = databaseManager.context.define('attachment', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Data: {
    type: Sequelize.BLOB('long')
  },
  Filename: {
    allowNull: false,
    type: Sequelize.STRING
  },
  MimeType: {
    allowNull: false,
    type: Sequelize.STRING
  }
},{
  instanceMethods: {
    getMap: function() {
      return Attachment.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {DTO}
 */
Attachment.getMap = function () {
  return attachmentMap;
};

module.exports = Attachment;
