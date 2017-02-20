const fs = require('fs');
const mime = require('mime');
const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const userService = require('../services/users.service');

const UserPhoto = require('../models/user-photo.model');

let routeName;

// Attribute Strings

routeName = '/user-photos';

/* GET */
router.get(`${routeName}/user/:id`, function(req, res, next) {
  let id = req.params.id;

  userService.getUserPhotosByUserId(id)
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* GET */
router.get(routeName, function(req, res, next) {
  userService.getAllUserPhotos()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

router.get(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  // Send a JSON response if one is requested
  if (req.headers.accept === 'application/json') {
    userService.getUserPhotoById(id)
      .then(serializer.serializeModel)
      .then(restUtils.prepareResponse)
      .then(payload => restUtils.sendResponse(payload, req, res))
      .catch(error => restUtils.catchErrors(error, req, res));
  }
  // Otherwise we send the file itself
  else {
    userService.getUserPhotoById(id)
      .then((entry) => {
      res.setHeader("Content-Type", entry.get('MimeType'));
      res.setHeader("Content-Disposition", `inline; filename=${entry.get('Filename')}`);
      res.send(entry.get('Data'));
    })
      .catch(error => restUtils.catchErrors(error, req, res));
  }
});


/* POST */
router.post(routeName, function(req, res, next) {
  restUtils.authenticate(req)
    .then(user => {
      return {
        'Data': fs.readFileSync(req.files.file.file),
        'Filename': req.files.file.filename,
        'MimeType': req.files.file.mimetype,
        'UserId': user.Id
      };
    })
    .then(data => serializer.mapDataToEntity(UserPhoto, data))
    .then(entity => userService.addUserPhoto(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  userService.deleteUserPhoto(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
