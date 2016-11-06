/**
 * Created by Brandon Garling on 11/5/2016.
 */
const config = {};

// Add a test config for the mailer
// TODO: Store this in the database during setup
config.mailer = {
  default: 'no-reply',
  accounts: {
    'no-reply': {

      }
    }
  };

module.exports = config;
