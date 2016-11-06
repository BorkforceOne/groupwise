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

config.database = {
  host: 'localhost',
  databaseName: 'groupwise',
  user: 'groupwise-app',
  password: 'abc123',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
};

config.session = {
  secret: 'changeme',
  resave: false,
  saveUninitialized: true
};

module.exports = config;
