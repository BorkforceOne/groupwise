const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bb = require('express-busboy');
const uuid = require('node-uuid');
const database = require('./user_modules/database');
const config = require('./config');

const app = express();

// Initialize the database
database.initDatabase();
// Create the session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({
  db: database.sequelize
});

// Set up Express settings
bb.extend(app, {
  upload: true
});

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: config.session.secret,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized,
  store: sessionStore
}));

// Add a GUID for each client
app.use(function(req, res, next) {
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

// Sync the database
database.syncDatabase();

/**
 * Set up the routes
 */
const routes = require('./routes');
app.use('/api/v1/', routes);

/**
 * Finish setting express settings
 */

app.use(express.static(path.join(__dirname, 'public')));
app.use('^(?!.*\/api\/v1\/).*$', function(request, response, next) {
  response.sendfile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error Handlers
 */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = {
  app: app,
  store: sessionStore
};
