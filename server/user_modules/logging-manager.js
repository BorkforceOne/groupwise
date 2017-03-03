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

      console.log(logFolder);

      if (!fs.existsSync(logFolder))
        fs.mkdirSync(logFolder);

      // Set up log rotation
      winston.add(winston.transports.DailyRotateFile, {
        name: 'dailyRotateInfo',
        filename: path.join(logFolder, 'info'),
        datePattern: '.yyyy-MM-dd.log',
        level: 'info'
      });

      winston.add(winston.transports.DailyRotateFile, {
        name: 'dailyRotateError',
        filename: path.join(logFolder, 'error'),
        datePattern: '.yyyy-MM-dd.log',
        level: 'error'
      });

      function formatArgs(args){
        return [util.format.apply(util.format, Array.prototype.slice.call(args))];
      }

      console.log = function(){
        winston.info.apply(winston, formatArgs(arguments));
      };
      console.info = function(){
        winston.info.apply(winston, formatArgs(arguments));
      };
      console.warn = function(){
        winston.warn.apply(winston, formatArgs(arguments));
      };
      console.error = function(){
        winston.error.apply(winston, formatArgs(arguments));
      };
      console.debug = function(){
        winston.debug.apply(winston, formatArgs(arguments));
      };

      console.log('[LOGGER] Winston Loaded');

      resolve();
    });
  }

}

module.exports = new LoggingManager();
