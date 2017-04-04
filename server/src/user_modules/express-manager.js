const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bb = require('express-busboy');
const csurf = require('csurf');
const database = require('./database-manager');
const config = require('./../config');

class ExpressManager {

  constructor() {
    this.context = null;
    this.sessionStore = null;

    this.loggedInGuard = (req, res, next) => {
      if (req.user === null) {
        res.status(403);
        res.send();
      }
      else {
        next();
      }
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      const usersService = require('../services/users.service');

      const wwwRoot = path.join(__dirname, '..', '..', 'www');
      this.context = express();
      this.csrfProtection = csurf();

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

      this.context.use(express.static(wwwRoot));
      this.context.use(cookieParser());
      this.context.use(session({
        secret: config.session.secret,
        resave: config.session.resave,
        saveUninitialized: config.session.saveUninitialized,
        store: sessionStore
      }));

      // Set up XSRF token stuff

      if (config.express.XSRFProtection) {
        this.context.use(this.csrfProtection);
        this.context.use((req, res, next) => {
          res.cookie('XSRF-TOKEN', req.csrfToken());
          next();
        });
      } else {
        console.warn("[EXPRESS] XSRF Protection is disabled!")
      }

      // Append the user
      this.context.use((req, res, next) => {
        req.user = null;

        if (req.session.userId)
          usersService.getById(req.session.userId)
            .then(user => {
                req.user = user;
                next();
              }
            );
        else
          next();
      });

      // Set up the routes
      const routes = require('./../routes/index');

      this.context.use('/api/v1/', routes);
      this.context.use('', function(request, response, next) {
        response.sendfile(path.join(wwwRoot, 'index.html'));
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
