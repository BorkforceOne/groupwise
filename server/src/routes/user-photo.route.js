const fs = require('fs');
const mime = require('mime');
const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const userService = require('../services/users.service');
const expressManager = require('../user_modules/express-manager');

const UserPhoto = require('../models/user-photo.model');

let routeName;

let canEdit = (req, res, next) => {
  if (req.user.Type === 'ADMINISTRATOR')
    return next();

  userService.getUserPhotoById(req.params.id)
    .then((model) => {
      if (model === null) {
        res.status(404);
        res.send();
        return;
      }

      if (model.UserId !== req.user.Id)
        return restUtils.rejectRequest();
      return next();
    })
    .catch((e) => {
      res.status(400);
      res.send();
    });
};

routeName = '/user-photos';

/* GET */
router.get(`${routeName}/user/:id`, expressManager.loggedInGuard, function(req, res, next) {
  let id = req.params.id;

  userService.getUserPhotosByUserId(id)
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* GET */
router.get(routeName, expressManager.loggedInGuard, function(req, res, next) {
  userService.getAllUserPhotos()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

router.get(`${routeName}/:id`, expressManager.loggedInGuard, function(req, res, next) {
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
router.post(routeName, expressManager.loggedInGuard, function(req, res, next) {
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
router.delete(`${routeName}/:id`, expressManager.loggedInGuard, canEdit, function(req, res, next) {
  let id = req.params.id;

  userService.deleteUserPhoto(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
