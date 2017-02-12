const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const usersService = require('../services/users.service');

const routeName = '/users';

/* GET users listing. */
router.get(routeName, function(req, res, next) {
  usersService.getAll()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

//getUserById
router.get(`${routeName}/:id`, function(req, res, next) {
  let userId = req.params.id;
  usersService.getById(userId)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new user */
router.post(routeName, function(req, res, next) {

  let data = req.body;

  serializer.mapDataToEntity(User, data)
    .then(entity => usersService.add(entity))
    .then(entity => entity.validateEmail())
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
