const winston = require('winston');
const winstonRotate = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');
const util = require('util');

class LoggingManager {

  constructor() {

  }

  init() {
    return new Promise((resolve, reject) => {
      // Set up logging
      const logFolder = path.join(__dirname, '..', '..', 'logs');

      if (!fs.existsSync(logFolder))
        fs.mkdirSync(logFolder);

      const logger = new (winston.Logger)({
          transports: [
              new (winston.transports.DailyRotateFile)({
                  name: 'dailyRotateInfo',
                  filename: path.join(logFolder, 'info'),
                  datePattern: '.yyyy-MM-dd.log',
                  level: 'info',
                  json: false
              }),
              new (winston.transports.DailyRotateFile)({
                  name: 'dailyRotateError',
                  filename: path.join(logFolder, 'error'),
                  datePattern: '.yyyy-MM-dd.log',
                  level: 'error',
                  json: false
              }),
              new (winston.transports.Console)({
                  colorize: true,
                  json: false
              })
          ]
      });

      // Set up log rotation

      function formatArgs(args){
        return [util.format.apply(util.format, Array.prototype.slice.call(args))];
      }

      console.log = function(){
        logger.info.apply(logger, formatArgs(arguments));
      };
      console.info = function(){
        logger.info.apply(logger, formatArgs(arguments));
      };
      console.warn = function(){
        logger.warn.apply(logger, formatArgs(arguments));
      };
      console.error = function(){
        logger.error.apply(logger, formatArgs(arguments));
      };
      console.debug = function(){
        logger.debug.apply(logger, formatArgs(arguments));
      };

      console.log('[LOGGER] Winston Loaded');

      resolve();
    });
  }

}

module.exports = new LoggingManager();
