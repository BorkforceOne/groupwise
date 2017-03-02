const serializer = require('../user_modules/serializer');

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

  addMatch(entity) {
    return new Promise((resolve, reject) => {
      this.validateMatch(entity)
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
