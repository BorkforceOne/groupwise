/**
 * Created by bjg96 on 11/7/16.
 */
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = {};

/**
 * Validates a hash of a string against the passed hash
 * @param string - The string to validate
 * @param salt - The salt for the hash
 * @param hash - The hash to validate against
 */
const validiateHash = function (string, salt, hash) {
  return new Promise(function (resolve, reject) {
    generateHash(string, salt)
      .then(function (stringHash) {
        if (hash == stringHash)
          resolve(true);
        else
          resolve(false);
      })
  });
};
module.exports.validiateHash = validiateHash;

/**
 * Generates a salted hash representation of the input string
 * @param string - The string to hash
 * @param salt - The salt to hash with
 */
const generateHash = function (string, salt) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(string, salt, function (err, stringHash) {
      if (err)
        throw err;
      resolve(stringHash);
    })
  });
};
module.exports.generateHash = generateHash;

/**
 * Generates a new salt
 */
const generateSalt = function () {
  return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err)
          throw err;
        resolve(salt);
      })
    });
};
module.exports.generateSalt = generateSalt;
