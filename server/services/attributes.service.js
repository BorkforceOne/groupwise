const restUtils = require('../user_modules/rest-utils');

const AttributeString = require('../models/attribute-string.model');
const AttributeStringValue = require('../models/attribute-string-value.model');
const AttributeDate = require('../models/attribute-date.model');
const AttributeDateValue = require('../models/attribute-date-value.model');
const AttributeRange = require('../models/attribute-range.model');
const AttributeRangeValue = require('../models/attribute-range-value.model');

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

          if (attribute.ForType != "BOTH" && user.Type != attribute.ForType)
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
            throw "Value is below allowed maxmimum";
        })
        .then(() => userService.getById(entity.UserId))
        .then((_user) => {
          user = _user;

          if (user == null)
            throw "User does not exist";

          if (attribute.ForType != "BOTH" && user.Type != attribute.ForType)
            throw "Attribute does not belong to this user type";
        })
        .then(() => resolve(entity))
        .catch(reject)
    });
  }

  // AttributeRanges
  getAllAttributeRanges() {
    return new Promise((resolve, reject) => {
      AttributeRange.findAll()
        .then(resolve)
        .catch(reject);
    });
  }

  getAttributeRange(id) {
    return new Promise((resolve, reject) => {
      AttributeRange.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  addAttributeRange(entity) {
    return new Promise((resolve, reject) => {
      this.validateAttributeRange(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  updateAttributeRange(data) {
    return new Promise((resolve, reject) => {

      this.getAttributeRange(data.Id)
        .then(entity => restUtils.mapDataToInstance(entity, data))
        .then(this.validateAttributeRange.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  deleteAttributeRange(id) {
    return new Promise((resolve, reject) => {
      let entity;

      this.getAttributeRange(id)
        .then(_entity => {
          entity = _entity;

          return entity;
        })
        .then(() => entity.destroy())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  validateAttributeRange(entity) {
    return new Promise((resolve, reject) => {
      // Do validation here

      let minDefined = false;
      let maxDefined = false;

      if (entity.Min != null) {
        if (typeof(entity.Min) != "number")
          throw "Min is invalid";
        if (entity.isInt == true)
          if (!Number.isInteger(entity.Min))
            throw "Min is not an integer";

        minDefined = true;
      }

      if (entity.Max != null) {
        if (typeof(entity.Max) != "number")
          throw "Max is invalid";

        if (entity.isInt == true)
          if (!Number.isInteger(entity.Max))
            throw "Max is not an integer";

        maxDefined = true;
      }

      if (minDefined && maxDefined)
        if (entity.Min > entity.Max)
          throw "Min cannot be larger than Max";

      resolve();
    });
  }

  // AttributeRangeValues
  getAllAttributeRangeValues(userId) {
    return new Promise((resolve, reject) => {
      AttributeRangeValue.findAll({
        where: {
          UserId: userId
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  getAttributeRangeValue(id) {
    return new Promise((resolve, reject) => {
      AttributeRangeValue.findOne({
        where: {
          Id: id
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  addAttributeRangeValue(entity) {
    return new Promise((resolve, reject) => {
      this.validateAttributeRangeValue(entity)
        .then(() => entity.save())
        .then(() => resolve(entity))
        .catch(reject);
    });
  }

  updateAttributeRangeValue(data) {
    return new Promise((resolve, reject) => {
      // Ensure that the value is valid

      this.getAttributeRangeValue(data.Id)
        .then(entity => restUtils.mapDataToInstance(entity, data))
        .then(this.validateAttributeRangeValue.bind(this))
        .then(entity => entity.save())
        .then(entity => resolve(entity))
        .catch(reject);
    });
  }

  validateAttributeRangeValue(entity) {
    return new Promise((resolve, reject) => {
      let attribute, user;

      this.getAttributeRange(entity.AttributeId)
        .then((_attribute) => {
          attribute = _attribute;

          if (attribute == null)
            throw "Attribute does not exist";

          if (entity.Value == null || typeof(entity.Value) != "number")
            throw "Value cannot be empty or is invalid";

          if (attribute.isInt == true)
            if (!Number.isInteger(entity.Value))
              throw "Value must be an integer";

          if (attribute.Min != null && entity.Value < attribute.Min)
            throw "Value is below allowed minimum";

          if (attribute.Max != null && entity.Value > attribute.Max)
            throw "Value is below allowed maxmimum";
        })
        .then(() => userService.getById(entity.UserId))
        .then((_user) => {
          user = _user;

          if (user == null)
            throw "User does not exist";

          if (attribute.ForType != "BOTH" && user.Type != attribute.ForType)
            throw "Attribute does not belong to this user type";
        })
        .then(() => resolve(entity))
        .catch(reject)
    });
  }
}

module.exports = new AttributeService();
