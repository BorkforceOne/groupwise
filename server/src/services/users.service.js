const serializer = require('../user_modules/serializer');
const encryptionManager = require('../user_modules/encryption-manager');
const mailerManager = require('../user_modules/mailer-manager');
const config = require('../config');
const listsService = require('./lists.service');
const ErrorModule = require('../error');
const AppError = ErrorModule.AppError;
const AppErrorTypes = ErrorModule.AppErrorTypes;

const User = require('../models/user.model');
const UserPhoto = require('../models/user-photo.model');

const ValidationToken = require('../models/validation-token.model');

class UserService {

  constructor() {

  }

  init() {
    this.tokenService = require('./token.service');
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

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          Email: email
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
      listsService.getAllLists()
        .then(lists => {
          let rejected = false;
          let whitelists = lists.filter((list) => list.Type === 'WHITELIST');
          let blacklists = lists.filter((list) => list.Type === 'BLACKLIST');

          // Check if blacklisted
          blacklists.forEach((list) => {
            if (entity.Email.indexOf(list.Email) !== -1) {
              reject(new AppError("This email has been blacklisted", AppErrorTypes.OTHER, 400));
              rejected = true;
              return;
            }
          });

          whitelists.forEach((list) => {
            if (entity.Email.indexOf(list.Email) !== -1) {
              entity.Status = 'ACTIVE';
              return;
            }
          });

          if (!rejected)
            this.validate(entity)
              .then(() => this.changePassword(entity, entity.Password))
              .then(() => entity.save())
              .then(() => resolve(entity))
              .catch(reject);
        });
    });
  }

  update(data) {
    return new Promise((resolve, reject) => {
      // Ensure that the value is valid

      this.getById(data.Id)
        .then(entity => serializer.mapDataToInstance(entity, data))
        .then(this.validate.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  validate(entity) {
    return new Promise((resolve, reject) => {
      //TODO: Validation

      resolve(entity);
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
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  validateEmail(user) {
    if (user == null)
      throw "User does not exist";

    return new Promise((resolve, reject) => {

      let token = ValidationToken.build({
        UserId: user.Id,
        Type: 'REGISTRATION'
      });

      this.tokenService.add(token)
        .then((validationToken) => {
          let mail = mailerManager.templates.validateEmail;

          let header = {
            to: user.Email
          };

          let params = {
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            VerificationURL: config.general.baseURL + '/validate?token=' + validationToken.Token
          };

          console.log(params.VerificationURL);

          mailerManager.sendMail(mail, header, params)
            .then(() => resolve(user))
            .catch((error) => reject(error));
        })
    })
  }

  resetPassword(user) {
    if (user == null)
      throw "User does not exist";

    return new Promise((resolve, reject) => {

      let token = ValidationToken.build({
        UserId: user.Id,
        Type: 'FORGOT_PASSWORD'
      });

      this.tokenService.add(token)
        .then((validationToken) => {
          let mail = mailerManager.templates.resetPasswordEmail;

          let header = {
            to: user.Email
          };

          let params = {
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            VerificationURL: config.general.baseURL + '/validate?token=' + validationToken.Token
          };

          console.log(params.VerificationURL);

          mailerManager.sendMail(mail, header, params)
            .then(() => resolve(this))
            .catch((error) => reject(error));
        })
    })
  }

  validateUserPhoto(entity) {
    return new Promise((resolve, reject) => {
      //TODO: Validation

      switch (entity.MimeType) {
        case 'image/png':
        case 'image/jpeg':
          break;
        default:
          throw "Image mime type not acceptable, must be 'image/png' or 'image/jpeg'";
      }

      resolve();
    });
  }

  getAllUserPhotos() {
    return new Promise((resolve, reject) => {
      UserPhoto.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  getUserPhotoById(id) {
    return new Promise((resolve, reject) => {
      UserPhoto.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  getUserPhotosByUserId(id) {
    return new Promise((resolve, reject) => {
      UserPhoto.findAll({
        where: {
          UserId: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  addUserPhoto(entity) {
    return new Promise((resolve, reject) => {
      this.validateUserPhoto(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  deleteUserPhoto(id) {
    return new Promise((resolve, reject) => {
      let entity;

      this.getUserPhotoById(id)
        .then(_entity => {
          entity = _entity;

          return entity;
        })
        .then(() => entity.destroy())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }
}

module.exports = new UserService();
