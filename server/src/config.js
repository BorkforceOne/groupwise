const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let config = require('./config.default.json');

let configCustomFile = path.join(__dirname, '..', 'config.json');

if (fs.existsSync(configCustomFile)) {
  let configCustom = require(configCustomFile);
  config = _.merge(config, configCustom);
}

module.exports = config;
