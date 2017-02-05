const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const StudentProfile = require('../models/student-profile.model');
const HostProfile = require('../models/host-profile.model');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

const routeName = '/users';

/* GET users listing. */
router.get(routeName, function(req, res, next) {
  User.findAll()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new user */
router.post(routeName, function(req, res, next) {

  new Promise((resolve, reject) => {
    let data = req.body;

    let user = restUtils.mapDataToEntityByMap(User.getMap().inMap, data);
    let profile;
    let includes = [];

    switch (user.Type) {
      case 'STUDENT':
        profile = restUtils.mapDataToEntityByMap(StudentProfile.getMap().inMap, data);
        user.StudentProfile = profile;
        includes.push(User.StudentProfile);
        break;
      case 'HOST':
        profile = restUtils.mapDataToEntityByMap(HostProfile.getMap().inMap, data);
        user.HostProfile = profile;
        includes.push(User.HostProfile);
        break;
      default:
        profile = null;
    }

    let userEntity = User.build(user, {
      include: includes
    });

    resolve(userEntity);
  })
    .then(entity => entity.changePassword(req.body.Password))
    .then(entity => entity.save())
    .then(entity => entity.validateEmail())
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
