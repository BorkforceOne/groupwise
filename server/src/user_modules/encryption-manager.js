const crypto = require('crypto');

class EncryptionManager {

  constructor() {

  }

  /**
   * Validates a hash of a string against the passed hash
   * @param string - The string to validate
   * @param salt - The salt for the hash
   * @param hash - The hash to validate against
   */
  validiateHash(string, salt, hash) {
    return new Promise((resolve, reject) => {
      this.generateHash(string, salt)
        .then((stringHash) => {
          if (hash == stringHash)
            resolve(true);
          else
            resolve(false);
        })
    });
  };

  /**
   * Generates a salted hash representation of the input string
   * @param string - The string to hash
   * @param salt - The salt to hash with
   */
  generateHash(string, salt) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(string, salt, 100000, 256, 'sha256', (err, stringHash) => {
        if (err)
          reject(err);
        resolve(stringHash.toString('hex'));
      })
    });
  };

  /**
   * Generates a new salt
   */
  generateSalt() {
    return new Promise((resolve, reject) => {
      resolve(crypto.randomBytes(16).toString('hex'));
    });
  };
}

module.exports = new EncryptionManager();
