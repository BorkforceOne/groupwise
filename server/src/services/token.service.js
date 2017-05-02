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

  getAll() {
    return new Promise((resolve, reject) => {
      ValidationToken.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  getByUserId(userId) {
    return new Promise((resolve, reject) => {
      ValidationToken.findAll({
        where: {
          UserId: userId
        }
      })
        .then(resolve)
        .catch(reject);
    })
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

  validate(token) {
    return new Promise((resolve, reject) => {
      //TODO: Validation

      this.getByUserId(token.UserId)
        .then((tokens) => {
          if (tokens.length > 0) {
            let existingTokens = tokens.filter((entity) => {
              return entity.Type == token.Type
            });

            if (existingTokens.length > 0) {
              // Delete old tokens of this type
              existingTokens.forEach((entity) => {
                entity.destroy();
              })
            }

          }

          resolve();
        })
        .catch(reject);

    });
  }

  _generateHashToken() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(8, function(ex, buf) {
        resolve(buf.toString('hex'));
      });
    });
  }

  _generateToken(entity) {
    return new Promise((resolve, reject) => {
      this._generateHashToken()
        .then((token) => entity.Token = token)
        .then(resolve)
        .catch(reject);
    });
  }

}

module.exports = new TokenService();
