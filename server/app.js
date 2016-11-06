const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const users = require('./routes/users');

const app = express();

app.use(users);

app.use('/', express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

const nodemailer = require('nodemailer');
const config = require('./config');


const transporter = nodemailer.createTransport(config.mailer.accounts[config.mailer.default].connectionString);

const sendPwdReset = transporter.templateSender({
  subject: 'Password reset for {{username}}!',
  text: 'Hello, {{username}}, Please go here to reset your password: {{ reset }}',
  html: '<b>Hello, <strong>{{username}}</strong>, Please <a href="{{ reset }}">go here to reset your password</a>: {{ reset }}</p>'
}, {
  from: config.mailer.accounts[config.mailer.default].from,
});


module.exports = app;
