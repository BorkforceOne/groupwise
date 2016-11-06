/**
 * Created by Brandon Garling on 11/6/2016.
 */

module.exports = {};

/**
 * Prepares a response by wrapping the payload with any metadata about the response we need to know
 * @param payload - The actual data response
 * @param errors - An array of errors that occured
 * @returns {{Payload: *, Errors: *}}
 */
const prepareResponse = function(payload, errors) {
  if (errors === undefined)
    errors = [];
  return {
    Payload: payload,
    Errors: errors
  };
};
module.exports.prepareResponse = prepareResponse;
