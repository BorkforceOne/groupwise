/**
 * This is to be used as a template for each install/development machine
 */
const config = require('./config.default');
const configCustom = require('./config.custom');
const _ = require('lodash');

module.exports = _.merge(config, configCustom);
