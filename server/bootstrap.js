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

  // We use Promises due to dependency issues and possible async calls that may occur in an init function

  // Note: We have to use .bind because of how promises work, they cause 'this' to become undefined on each call to '.then'
  //       a bit of a pain, but it works.

  // Initialize Database
  databaseManager.init()
    // Initialize Express
    .then(expressManager.init.bind(expressManager))
    // Initialize Http
    .then(httpManager.init.bind(httpManager))
    // Initialize SocketIO
    .then(socketManager.init.bind(socketManager))
    // Initialize Mailer Manager
    .then(mailerManager.init.bind(mailerManager))
    // Initialize Notifications Manager
    .then(notificationsManager.init.bind(notificationsManager))
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
}

// Start all the things!
bootstrap();
