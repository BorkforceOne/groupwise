const crypto = require('crypto');
const serializer = require('../user_modules/serializer');
const encryptionManager = require('../user_modules/encryption-manager');
const mailerManager = require('../user_modules/mailer-manager');
const config = require('../config');

const User = require('../models/user.model');
const ValidationToken = require('../models/validation-token.model');

class TokenService {

  constructor() {

  }

  init() {
    this.userService = require('./users.service');
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      ValidationToken.findOne({
          where: {
            Id: id
          }
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getByToken(token) {
    return new Promise((resolve, reject) => {
      ValidationToken.findOne({
        where: {
          Token: token
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  processToken(token, data) {
    if (token == null)
      throw "Token does not exist";

    return new Promise((resolve, reject) => {
      switch (token.Type) {
        case 'REGISTRATION':
          token.destroy()
            .then(resolve)
            .catch(reject);
          break;

        case 'FORGOT_PASSWORD':
          this.userService.getById(token.UserId)
            .then((user) => {
              return this.userService.changePassword(user, data.Password);
            })
            .then((user) => user.save())
            .then(() => token.destroy())
            .then(resolve)
            .catch(reject)
      }
    });
  }

  add(entity) {
    return new Promise((resolve, reject) => {
      this.validate(entity)
        .then(() => this._generateToken(entity))
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  validate(entity) {
    return new Promise((resolve, reject) => {
      //TODO: Validation

      resolve();
    });
  }

  _generateToken(entity) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(8, function(ex, buf) {
        entity.Token = buf.toString('hex');
        resolve();
      });
    });
  }

}

module.exports = new TokenService();
