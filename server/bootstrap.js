/**
 * Start the different parts of the application here
 */
function bootstrap() {
  const databaseManager = require('./user_modules/database-manager');
  const expressManager = require('./user_modules/express-manager');
  const httpManager = require('./user_modules/http-manager');
  const socketManager = require('./user_modules/socket-manager');
  const mailerManager = require('./user_modules/mailer-manager');
  const notificationsManager = require('./user_modules/notifications-manager');
  const loggingManager = require('./user_modules/logging-manager');

  const services = require('./services');

  // We use Promises due to dependency issues and possible async calls that may occur in an init function

  // Note: We have to use .bind because of how promises work, they cause 'this' to become undefined on each call to '.then'
  //       a bit of a pain, but it works.

  // Initialize Logging
  loggingManager.init()
    // Initialize Database
    .then(() => databaseManager.init())
    // Initialize Services
    .then(() => services.init())
    // Initialize Express
    .then(() => expressManager.init())
    // Initialize Http
    .then(() => httpManager.init())
    // Initialize SocketIO
    .then(() => socketManager.init())
    // Initialize Mailer Manager
    .then(() => mailerManager.init())
    // Initialize Notifications Manager
    .then(() => notificationsManager.init())
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
}

// Start all the things!
bootstrap();
