const Sequelize = require('sequelize');
const config = require('../config');

class DatabaseManager {

  constructor() {
    this.context = null;
  }

  /**
   * Initializes the databaseManager for use by attempting to connect to the databaseManager
   */
  init() {
    return new Promise((resolve, reject) => {
      this.context = new Sequelize(
        config.database.databaseName,
        config.database.user,
        config.database.password,
        {
          host: config.database.host,
          dialect: config.database.dialect,

          pool: {
            max: config.database.pool.max,
            min: config.database.pool.min,
            idle: config.database.pool.idle
          },
          logging: config.database.logging,
          storage: config.database.storage
        }
      );

      this.context.authenticate()
        .then(function () {
          console.log("[DATABASE] Connection to databaseManager established successfully");
        })
        .catch(function (err) {
          console.error("[DATABASE] Unable to connect to the databaseManager: ", err);
        });

      // Require all needed models
      require('../models');
      this.sync(true);

      resolve();
    });
  }

  /**
   * Sync the databaseManager, this will create tables if they do not exist. If
   * the force option is set then it will drop any existing tables and re-
   * create them.
   * @param force
   * @returns {Promise}
   */
  sync(force) {
      const User = require('../models/user.model');
      const seed = require('../seed');

      return new Promise((resolve, reject) => {
        resolve(this.context.sync({force: force}));
      })
        .then(() => {
          if (force)
            seed.doSeed()
        })
        .catch(e => {
          console.error(e);
        });
    };

}

module.exports = new DatabaseManager();
