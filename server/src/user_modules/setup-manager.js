const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bb = require('express-busboy');
const csurf = require('csurf');
const database = require('./database-manager');
const config = require('./../config');
const crypto = require('crypto');

const rootPath = path.join(__dirname, '..', '..');

class SetupManager {

  constructor() {
    this.secretToken = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      const setupMarkerPath = path.join(rootPath, '.setup-completed');

      if (fs.existsSync(setupMarkerPath))
        resolve();

      this.handleSecretToken()
        .then(() => resolve())
        .catch(reject);
    });
  }

  handleSecretToken() {
    return new Promise((resolve, reject) => {
      const secretTokenPath = path.join(rootPath, 'secret-token.txt');

      if (!fs.existsSync(secretTokenPath)) {
        console.log(`[SETUP] Creating secret token '${secretTokenPath}'`);

        let secret = crypto.randomBytes(16).toString('hex');

        fs.writeFile(secretTokenPath, secret, (err) => {
          if (err)
            reject(err);
          else {
            this.secretToken = secret;
            resolve();
          }
        });
      }
      else {
        fs.readFile(secretTokenPath, (err, data) => {
          if (err)
            reject(err);
          else {
            this.secretToken = data;
            resolve();
          }
        })
      }
    })
  }
}

module.exports = new SetupManager();
