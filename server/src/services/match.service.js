const serializer = require('../user_modules/serializer');
const mailerManager = require('../user_modules/mailer-manager');

const Match = require('../models/match.model');

class MatchService {

  constructor() {

  }

  init() {
    this.userService = require('./users.service');
  }

  getAllMatches() {
    return new Promise((resolve, reject) => {
      Match.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  getUserMatches(userId) {
    return new Promise((resolve, reject) => {
      Match.findAll({
        where: {
          $or: [
            {
              HostUserId: userId
            },
            {
              StudentUserId: userId
            }
          ]
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  getMatch(id) {
    return new Promise((resolve, reject) => {
      Match.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  processMatch(entity) {
    return new Promise((finalResolve, finalReject) => {
      let hostUser;
      let studentUser;
      this.userService.getById(entity.HostUserId)
        .then((user) => {
          hostUser = user;
        })
        .then(() => this.userService.getById(entity.StudentUserId))
        .then((user) => {
          studentUser = user;
        })
        .then(() => {
          switch (entity.Status) {
            case "PROPOSED":
              return new Promise((resolve, reject) => {
                let mail = mailerManager.templates.proposeMatch;

                let header = {
                  to: studentUser.Email
                };

                let params = {
                  Firstname: studentUser.Firstname,
                  Lastname: studentUser.Lastname,
                  MatchFirstname: hostUser.Firstname,
                  MatchLastname: hostUser.Lastname
                };

                mailerManager.sendMail(mail, header, params)
                  .then(resolve)
                  .catch(reject);
              });
              break;
          }
        })
        .then(finalResolve)
        .catch(finalReject)
    });
  }

  addMatch(entity) {
    return new Promise((resolve, reject) => {
      this.validateMatch(entity)
        .then(() => this.processMatch(entity))
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  updateMatch(data) {
    return new Promise((resolve, reject) => {

      this.getMatch(data.Id)
        .then(entity => serializer.mapDataToInstance(entity, data))
        .then(entity => this.validateMatch(entity))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  deleteMatch(id) {
    return new Promise((resolve, reject) => {
      let entity;

      this.getMatch(id)
        .then(_entity => {
          entity = _entity;

          return entity;
        })
        .then(() => entity.destroy())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  validateMatch(entity) {
    return new Promise((resolve, reject) => {
      // Do validation here

      resolve(entity);
    });
  }
}

module.exports = new MatchService();
