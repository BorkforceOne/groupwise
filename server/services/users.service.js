const restUtils = require('../user_modules/rest-utils');
const encryptionManager = require('../user_modules/encryption-manager');

const User = require('../models/user.model');

class UserService {

  constructor() {

  }

  getById(id) {
    return new Promise((resolve, reject) => {
      User.findOne({
          where: {
            Id: id
          }
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      User.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  add(entity) {
    return new Promise((resolve, reject) => {
      this.validate(entity)
        .then(() => this.changePassword(entity, entity.Password))
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  update(data) {
    return new Promise((resolve, reject) => {
      // Ensure that the value is valid

      this.getById(data.Id)
        .then(entity => restUtils.mapDataToInstance(entity, data))
        .then(this.validate.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  validate(entity) {
    return new Promise((resolve, reject) => {
      //TODO: Validation

      resolve();
    });
  }

  changePassword(entity, password) {
    return new Promise((resolve, reject) => {
      encryptionManager.generateSalt()
        .then(salt => {
          entity.Salt = salt;
        })
        .then(() => encryptionManager.generateHash(password, entity.Salt))
        .then(hash => {
          entity.Password = hash;
        })
        .then(resolve)
        .catch(reject);
    });
  }

}

module.exports = new UserService();
