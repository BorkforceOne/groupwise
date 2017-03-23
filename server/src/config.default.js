/**
 * This is to be used as a template for each install/development machine
 */
const config = {};

// Add a test config for the mailer
// TODO: Store this in the databaseManager during setup
config.mailer = {
  default: 'no-reply',
  accounts: {
    'no-reply': {

    }
  }
};

config.express = {
  XSRFProtection: true
};

config.general = {
  baseURL: 'http://localhost:4200'
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
  logging: false,
  dialect: 'sqlite',
  storage: 'db.sqlite'
};

config.session = {
  secret: 'changeme',
  resave: false,
  saveUninitialized: true
};

module.exports = config;
