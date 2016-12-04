/**
 * Created by Brandon Garling on 11/7/2016.
 */
const Sequelize = require('sequelize');
const database = require('../user_modules/database');

module.exports = {};

/**
 * A Attachment model
 * @type {*}
 */
const Attachment = database.sequelize.define('attachment', {
  Data: {
    type: Sequelize.BLOB
  },
  Filename: {
    allowNull: false,
    type: Sequelize.STRING
  },
  MimeType: {
    allowNull: false,
    type: Sequelize.STRING
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
      return Attachment.getSerializableFields();
    }
  },
});

/**
 * The fields that should be serialized and sent to the client
 * @returns {[string]}
 */
Attachment.getSerializableFields = function () {
  return ['Id', 'Filename', 'UserId', 'createdAt', 'updatedAt'];
};

module.exports = Attachment;
