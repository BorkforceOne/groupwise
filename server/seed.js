const restUtils = require('./user_modules/rest-utils');

const AttributeString = require('./models/attribute-string.model');
const AttributeDate = require('./models/attribute-date.model');
const AttributeRange = require('./models/attribute-range.model');
const User = require('./models/user.model');

const attributesService = require('./services/attributes.service');
const usersService = require('./services/users.service');

const attributeSeedData = [
  {
    Type: "USER",
    Data: {
      "Firstname": "Admin",
      "Lastname": "Admin",
      "Email": "test@example.com",
      "Type": "ADMINISTRATOR",
      "Password": "1234"
    }
  },
  {
    Type: "STRING",
    Data: {
      "Name": "Hobbies",
      "Description": "What hobbies do you enjoy?",
      "ForType": "BOTH"
    }
  },
  {
    Type: "DATE",
    Data: {
      "Name": "Birthday",
      "Description": "What is your birthday?",
      "ForType": "BOTH"
    }
  }
];

module.exports.doSeed = () => {
  for (let i = 0; i < attributeSeedData.length; i ++) {
    let datum = attributeSeedData[i];
    switch (datum.Type) {
      case "STRING":
        restUtils.mapDataToEntity(AttributeString, datum.Data)
          .then(entity => attributesService.addAttributeString(entity))
          .catch(error => restUtils.catchErrors(error));
        break;

      case "DATE":
        restUtils.mapDataToEntity(AttributeDate, datum.Data)
          .then(entity => attributesService.addAttributeDate(entity))
          .catch(error => restUtils.catchErrors(error));
        break;

      case "RANGE":
        restUtils.mapDataToEntity(AttributeRange, datum.Data)
          .then(entity => attributesService.addAttributeRange(entity))
          .catch(error => restUtils.catchErrors(error));
        break;

      case "USER":
        restUtils.mapDataToEntity(User, datum.Data)
          .then(entity => usersService.add(entity))
          .catch(error => restUtils.catchErrors(error));
    }
  }
};
