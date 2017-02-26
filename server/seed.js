const restUtils = require('./user_modules/rest-utils');
const serializer = require('./user_modules/serializer');

const AttributeString = require('./models/attribute-string.model');
const AttributeDate = require('./models/attribute-date.model');
const AttributeRange = require('./models/attribute-range.model');
const AttributeEnum = require('./models/attribute-enum.model');

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
      "Password": "1234",
      "Phone": "555-555-5555",
      "Gender": "FEMALE",
      "Birthday": "1995-01-14T00:00:00Z"
    }
  },
  {
    Type: "USER",
    Data: {
      "Firstname": "John",
      "Lastname": "Doe",
      "Email": "john@doe.com",
      "Type": "HOST",
      "Password": "1234",
      "Phone": "555-555-5555",
      "Gender": "MALE",
      "Birthday": "1995-01-14T00:00:00Z"
    }
  },
  {
    Type: "STRING",
    Data: {
      "Name": "Hobbies",
      "Question": "What hobbies do you enjoy?",
      "Description": "Hobbies",
      "ForType": "BOTH"
    }
  },
  {
    Type: "STRING",
    Data: {
      "Name": "Citizenship",
      "Description": "Country of citizenship",
      "Question": "What is your country of citizenship?",
      "ForType": "STUDENT"
    }
  },
  {
    Type: "STRING",
    Data: {
      "Name": "Languages",
      "Description": "Languages spoken",
      "Question": "What language(s) do you speak?",
      "ForType": "BOTH"
    }
  },
  {
    Type: "STRING",
    Data: {
      "Name": "Major",
      "Description": "Major",
      "Question": "What is your Major?",
      "ForType": "STUDENT"
    }
  },
  {
    Type: "DATE",
    Data: {
      "Name": "StudyBegin",
      "Description": "Began studying at NAU",
      "Question": "When did you begin your studies at NAU?",
      "ForType": "STUDENT"
    }
  },
  {
    Type: "DATE",
    Data: {
      "Name": "StudyEnd",
      "Description": "End studying at NAU",
      "Question": "What is your expected graduation date?",
      "ForType": "STUDENT"
    }
  },
  {
    Type: "RANGE",
    Data: {
      "Name": "Children",
      "Description": "Children",
      "Question": "How many children do you have?",
      "ForType": "BOTH",
      "isInt": true,
      "Min": 0
    }
  },
  {
    Type: "ENUM",
    Data: {
      "Name": "Smoke",
      "Description": "Smoking frequency",
      "Question": "How often do you smoke?",
      "ForType": "BOTH",
      "MinSelect": 1,
      "MaxSelect": 1,
      "SelectType": "DROPDOWN",
      "Options": [
        {
          "Value": "NEVER",
          "Display": "Never"
        },
        {
          "Value": "SOMETIMES",
          "Display": "Sometimes"
        },
        {
          "Value": "OFTEN",
          "Display": "Often"
        }
      ]
    }
  },
  {
    Type: "ENUM",
    Data: {
      "Name": "Alcohol",
      "Description": "Alcohol consumption frequency",
      "Question": "How often do you drink alcohol?",
      "ForType": "BOTH",
      "MinSelect": 1,
      "MaxSelect": 1,
      "SelectType": "DROPDOWN",
      "Options": [
        {
          "Value": "NEVER",
          "Display": "Never"
        },
        {
          "Value": "SOMETIMES",
          "Display": "Sometimes"
        },
        {
          "Value": "OFTEN",
          "Display": "Often"
        }
      ]
    }
  },
  {
    Type: "ENUM",
    Data: {
      "Name": "Married",
      "Description": "Married?",
      "Question": "Are you married?",
      "ForType": "BOTH",
      "MinSelect": 1,
      "MaxSelect": 1,
      "SelectType": "RADIO",
      "Options": [
        {
          "Value": "YES",
          "Display": "Yes"
        },
        {
          "Value": "NO",
          "Display": "No"
        }
      ]
    }
  },
  {
    Type: "ENUM",
    Data: {
      "Name": "OwnCar",
      "Description": "Has own car?",
      "Question": "Do you own a car?",
      "ForType": "BOTH",
      "MinSelect": 1,
      "MaxSelect": 1,
      "SelectType": "RADIO",
      "Options": [
        {
          "Value": "YES",
          "Display": "Yes"
        },
        {
          "Value": "NO",
          "Display": "No"
        }
      ]
    }
  },
  {
    Type: "ENUM",
    Data: {
      "Name": "AcademicStatus",
      "Question": "What is your academic status?",
      "Description": "Academic status",
      "ForType": "STUDENT",
      "MinSelect": 1,
      "MaxSelect": 1,
      "SelectType": "DROPDOWN",
      "Options": [
        {
          "Value": "PIE",
          "Display": "PIE Student"
        },
        {
          "Value": "UNDERGRAD",
          "Display": "Undergraduate Student"
        },
        {
          "Value": "GRADUATE",
          "Display": "Graduate Student (M.S., Ph.D, etc.)"
        }
      ]
    }
  }
];

module.exports.doSeed = () => {
  for (let i = 0; i < attributeSeedData.length; i ++) {
    let datum = attributeSeedData[i];
    switch (datum.Type) {
      case "STRING":
        serializer.mapDataToEntity(AttributeString, datum.Data)
          .then(entity => attributesService.addAttributeString(entity))
          .catch(error => restUtils.catchErrors(error));
        break;

      case "DATE":
        serializer.mapDataToEntity(AttributeDate, datum.Data)
          .then(entity => attributesService.addAttributeDate(entity))
          .catch(error => restUtils.catchErrors(error));
        break;

      case "RANGE":
        serializer.mapDataToEntity(AttributeRange, datum.Data)
          .then(entity => attributesService.addAttributeRange(entity))
          .catch(error => restUtils.catchErrors(error));
        break;

      case "ENUM":
        serializer.mapDataToEntity(AttributeEnum, datum.Data)
          .then(entity => attributesService.addAttributeRange(entity))
          .catch(error => restUtils.catchErrors(error));
        break;

      case "USER":
        serializer.mapDataToEntity(User, datum.Data)
          .then(entity => usersService.add(entity))
          .catch(error => restUtils.catchErrors(error));
    }
  }
};
