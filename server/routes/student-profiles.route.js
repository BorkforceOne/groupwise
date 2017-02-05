const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/student-profile.model');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

const routeName = '/student-profiles';

/* GET student-profiles listing. */
router.get(routeName, function(req, res, next) {
  StudentProfile.findAll()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
