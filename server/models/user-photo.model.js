const Sequelize = require('sequelize');
const databaseManager = require('../user_modules/database-manager');

const userPhotoMap = require('./maps/user-photo.map');

module.exports = {};

const UserPhoto = databaseManager.context.define('userPhoto', {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  AttachmentId: {
    allowNull: false,
    type:  Sequelize.TEXT
  },
  UserId: {
    type: Sequelize.INTEGER,
    unique: 'User_Attribute_unique',
  }
},{
  instanceMethods: {
    getMap: function() {
      return UserPhoto.getMap();
    }
  },
});

/**
 * Figures out how to serialize and deserialize this model
 * @returns {Object}
 */
UserPhoto.getMap = function () {
  return userPhotoMap;
};

module.exports = UserPhoto;
