const _ = require('lodash');
const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');
const attachments = require('./attachments');
const config = require('./config');

router.use('/', users, auth, attachments, config);

module.exports = router;
