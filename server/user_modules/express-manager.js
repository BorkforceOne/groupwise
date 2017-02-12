const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bb = require('express-busboy');
const uuid = require('node-uuid');
const database = require('./database-manager');
const config = require('./../config');

class ExpressManager {

  constructor() {
    this.context = null;
    this.sessionStore = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.context = express();

      // Create the session store
      const SequelizeStore = require('connect-session-sequelize')(session.Store);
      const sessionStore = new SequelizeStore({
        db: database.context
      });

      this.sessionStore = sessionStore;

      // Set up Express settings
      bb.extend(this.context, {
        upload: true
      });

      this.context.use(favicon(path.join(__dirname, '..', 'assets', 'favicon.ico')));
      this.context.use(cookieParser());
      this.context.use(session({
        secret: config.session.secret,
        resave: config.session.resave,
        saveUninitialized: config.session.saveUninitialized,
        store: sessionStore
      }));

      // Add a GUID for each client
      this.context.use(function(req, res, next) {
        // check if client sent cookie
        let cookie = req.cookies.guid;
        if (cookie === undefined)
        {
          // no: set a new cookie
          let guid = uuid.v4();
          res.cookie('guid', guid, { maxAge: 3600000, httpOnly: true });
        }
        next();
      });

      // Set up the routes
      const routes = require('./../routes/index');

      this.context.use('/api/v1/', routes);
      this.context.use(express.static(path.join(__dirname, '..', 'public')));
      this.context.use('', function(request, response, next) {
        response.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
      });

      // catch 404 and forward to error handler
      this.context.use(function(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
      });

      /**
       * Error Handlers
       */

      // development error handler
      // will print stacktrace
      if (this.context.get('env') === 'development') {
        this.context.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.send(err.message);
        });
      }

      // production error handler
      // no stacktraces leaked to user
      this.context.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
      });

      resolve();
    });
  }
}

module.exports = new ExpressManager();
