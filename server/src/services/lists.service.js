const serializer = require('../user_modules/serializer');

const Lists = require('../models/lists.model');

class ListService {

  constructor() {

  }

  init() {

  }

  getAllLists() {
    return new Promise((resolve, reject) => {
      Lists.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  getList(id) {
    return new Promise((resolve, reject) => {
      Lists.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  addList(entity) {
    return new Promise((resolve, reject) => {
      this.validateList(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  updateList(data) {
    return new Promise((resolve, reject) => {

      this.getList(data.Id)
        .then(entity => serializer.mapDataToInstance(entity, data))
        .then(entity => this.validateList(entity))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  deleteList(id) {
    return new Promise((resolve, reject) => {
      let entity;

      this.getList(id)
        .then(() => entity.destroy())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  validateList(entity) {
    return new Promise((resolve, reject) => {
      // Do validation here

      resolve(entity);
    });
  }
}

module.exports = new ListService();
