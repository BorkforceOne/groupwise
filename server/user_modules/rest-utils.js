const User = require('../models/user');

module.exports = {};

/**
 * Prepares a response by wrapping the payload with any metadata about the response we need to know
 * @param payload - The actual data response
 * @param errors - An array of errors that occured
 * @returns {Promise}
 */
const prepareResponse = function(payload, errors=[]) {
  return new Promise((resolve, reject) => {
    resolve({
      Payload: payload,
      Errors: errors
    });
  });
};
module.exports.prepareResponse = prepareResponse;

const catchErrors = function(error, req, res) {
  return new Promise((resolve, reject) => {
    let message = "An internal server error occurred";
    if (error.message)
      message = error.message;
    else if (typeof error === "string")
      message = error;
    console.log("Error: ", message);

    prepareResponse({}, [message])
      .then(payload => sendResponse(payload, req, res))
      .then(resolve());
  })
};
module.exports.catchErrors = catchErrors;

const sendResponse = function(json, req, res) {
  return new Promise((resolve, reject) => {
    res.type('json');
    res.send(JSON.stringify(json));
    resolve();
  })
};
module.exports.sendResponse = sendResponse;

const authenticate = function(req) {
  return new Promise((resolve, reject) => {
    if (req.session.userId !== undefined && req.session.userId !== null) {
      let userId = req.session.userId;

      // Try to lookup the user, and return them
      User.findOne({
        where: {
          Id: userId
        }
      })
        .then(entity => {
          if (entity === null)
            reject("Authentication failure");

          resolve(entity);
        })
    }
    else {
      reject("Authentication failure");
    }
  })
};
module.exports.authenticate = authenticate;
