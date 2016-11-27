const _ = require('lodash');
const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');
const attachments = require('./attachments');

router.use('/', users, auth, attachments);

module.exports = router;
