const _ = require('lodash');
const router = require('express').Router();

const usersRoute = require('./users.route');
const authsRoute = require('./auths.route');
const attachmentsRoute = require('./attachments.routes');
const configsRoute = require('./configs.route');
const tokensRoute = require('./tokens.route.js');
const hostProfilesRoute = require('./host-profiles.route');
const studentProfilesRoute = require('./student-profiles.route');

router.use('/', usersRoute, authsRoute, attachmentsRoute, configsRoute, tokensRoute, hostProfilesRoute, studentProfilesRoute);

module.exports = router;
