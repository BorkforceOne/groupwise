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
  UserId: {
    allowNull: false,
    type: Sequelize.INTEGER
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
