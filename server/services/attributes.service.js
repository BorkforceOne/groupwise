const restUtils = require('../user_modules/rest-utils');

const AttributeString = require('../models/attribute-string.model');
const AttributeStringValue = require('../models/attribute-string-value.model');
const AttributeDate = require('../models/attribute-date.model');
const AttributeDateValue = require('../models/attribute-date-value.model');

const userService = require('./users.service');

class AttributeService {

  constructor() {

  }

  // AttributeStrings
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

  validateAttributeString(entity) {
    return new Promise((resolve, reject) => {
      // Do validation here

      resolve();
    });
  }

  // AttributeStringValues
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

  addAttributeStringValue(entity) {
    return new Promise((resolve, reject) => {
      this.validateAttributeStringValue(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
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

  // AttributeDates
  getAllAttributeDates() {
    return new Promise((resolve, reject) => {
      AttributeDate.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  getAttributeDate(id) {
    return new Promise((resolve, reject) => {
      AttributeDate.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  addAttributeDate(entity) {
    return new Promise((resolve, reject) => {
      this.validateAttributeDate(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  updateAttributeDate(data) {
    return new Promise((resolve, reject) => {

      this.getAttributeDate(data.Id)
        .then(entity => restUtils.mapDataToInstance(entity, data))
        .then(this.validateAttributeDate.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  deleteAttributeDate(id) {
    return new Promise((resolve, reject) => {
      let entity;

      this.getAttributeDate(id)
        .then(_entity => {
          entity = _entity;

          return entity;
        })
        .then(() => entity.destroy())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  validateAttributeDate(entity) {
    return new Promise((resolve, reject) => {
      // Do validation here

      let minDateDefined = false;
      let maxDateDefined = false;

      if (entity.MinDate != null) {
        if (isNaN(entity.MinDate.getTime()))
          throw "MinDate is invalid";

        minDateDefined = true;
      }

      if (entity.MaxDate != null) {
        if (isNaN(entity.MaxDate.getTime()))
          throw "MaxDate is invalid";

        maxDateDefined = true;
      }

      if (minDateDefined && maxDateDefined)
        if (entity.MinDate > entity.MaxDate)
          throw "MinDate cannot be larger than MaxDate";

      resolve();
    });
  }

  // AttributeDateValues
  getAllAttributeDateValues(userId) {
    return new Promise((resolve, reject) => {
      AttributeDateValue.findAll({
        where: {
          UserId: userId
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  getAttributeDateValue(id) {
    return new Promise((resolve, reject) => {
      AttributeDateValue.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  addAttributeDateValue(entity) {
    return new Promise((resolve, reject) => {
      this.validateAttributeDateValue(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  updateAttributeDateValue(data) {
    return new Promise((resolve, reject) => {
      // Ensure that the value is valid

      this.getAttributeDateValue(data.Id)
        .then(entity => restUtils.mapDataToInstance(entity, data))
        .then(this.validateAttributeDateValue.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  validateAttributeDateValue(entity) {
    return new Promise((resolve, reject) => {
      let attribute, user;

      this.getAttributeDate(entity.AttributeId)
        .then((_attribute) => {
          attribute = _attribute;

          if (attribute == null)
            throw "Attribute does not exist";

          if (entity.Value == null || isNaN(entity.Value.getTime()))
            throw "Value cannot be empty or is invalid";

          if (attribute.MinDate != null && entity.Value.getTime() < attribute.MinDate.getTime())
            throw "Value is below allowed minimum";

          if (attribute.MaxDate != null && entity.Value.getTime() > attribute.MaxDate.getTime())
            throw "Value is below above maxmimum";
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
}

module.exports = new AttributeService();
