const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const userService = require('../services/users.service');

const UserPhoto = require('../models/user-photo.model');

let routeName;

// Attribute Strings

routeName = '/user-photos';

/* GET attribute-string listings. */
router.get(routeName, function(req, res, next) {
  userService.getAllUserPhotos()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-string. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(UserPhoto, data)
    .then(entity => userService.addUserPhoto(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-string. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  userService.updateUserPhoto(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE attribute-string. */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  userService.deleteUserPhoto(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
