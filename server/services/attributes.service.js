const restUtils = require('../user_modules/rest-utils');

const AttributeString = require('../models/attribute-string.model');
const AttributeStringValue = require('../models/attribute-string-value.model');

const userService = require('./users.service');

class AttributeService {

  constructor() {

  }

  getAllAttributeStrings() {
    return new Promise((resolve, reject) => {
      AttributeString.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  getAttributeString(id) {
    return new Promise((resolve, reject) => {
      AttributeString.findOne({
          where: {
            Id: id
          }
        })
        .then(resolve)
        .catch(reject);
    });
  }

  addAttributeString(entity) {
    return new Promise((resolve, reject) => {
      this.validateAttributeString(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  deleteAttributeString(id) {
    return new Promise((resolve, reject) => {
      let entity;

      this.getAttributeString(id)
        .then(_entity => {
          entity = _entity;

          return entity;
        })
        .then(() => entity.destroy())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  addAttributeStringValue(entity) {
    return new Promise((resolve, reject) => {
      this.validateAttributeStringValue(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  validateAttributeStringValue(entity) {
    return new Promise((resolve, reject) => {
      let attribute, user;

      this.getAttributeString(entity.AttributeId)
        .then((_attribute) => {
          attribute = _attribute;

          if (attribute == null)
            throw "Attribute does not exist";

          if (attribute.MaxLength != null && entity.Value.length > attribute.MaxLength)
            throw "Value exceeds MaxLength";
        })
        .then(() => userService.getById(entity.UserId))
        .then((_user) => {
          user = _user;

          if (user == null)
            throw "User does not exist";

          if (user.Type != attribute.ForType)
            throw "Attribute does not belong to this user type";
        })
        .then(() => resolve(entity))
        .catch(reject)
    });
  }

  validateAttributeString(entity) {
    return new Promise((resolve, reject) => {
      // Do validation here

      resolve();
    });
  }

  updateAttributeStringValue(data) {
    return new Promise((resolve, reject) => {
      // Ensure that the value is valid

      this.getAttributeStringValue(data.Id)
        .then(entity => restUtils.mapDataToInstance(entity, data))
        .then(this.validateAttributeStringValue.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  updateAttributeString(data) {
    return new Promise((resolve, reject) => {

      this.getAttributeString(data.Id)
        .then(entity => restUtils.mapDataToInstance(entity, data))
        .then(this.validateAttributeString.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  getAttributeStringValue(id) {
    return new Promise((resolve, reject) => {
      AttributeStringValue.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  getAllAttributeStringValues(userId) {
    return new Promise((resolve, reject) => {
      AttributeStringValue.findAll({
        where: {
          UserId: userId
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = new AttributeService();
