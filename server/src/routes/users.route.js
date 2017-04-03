const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const usersService = require('../services/users.service');
const matchService = require('../services/match.service');
const expressManager = require('../user_modules/express-manager');

const routeName = '/users';

let filterModels = (models, req, res) => {
  let wasArray = true;

  if (!Array.isArray(models)) {
    models = [models];
    wasArray = false;
  }

  return new Promise((resolve, reject) => {
    switch (req.user.Type) {
      case 'ADMINISTRATOR':
        if (wasArray === false)
          resolve(models[0]);
        else
          resolve(models);
        break;
      case 'STUDENT':
        matchService.getUserMatches(req.user.Id)
          .then((matches) => {
            let found = models.filter((model) => matches.find((match) => (match.HostUserId === req.user.Id || match.StudentUserId === req.user.Id)) || model.Id === req.user.Id);
            if (wasArray === false)
              resolve(found[0]);
            else
              resolve(found);
          })
          .catch(reject);
        break;
      case 'HOST':
        let found = models.filter((model) => model.Type === 'STUDENT' || model.Id === req.user.Id);

        if (wasArray === false)
          resolve(found[0]);
        else
          resolve(found);
        break;
    }
  });
};

let stripModels = (models, req, res) => {
  let wasArray = true;

  if (!Array.isArray(models)) {
    models = [models];
    wasArray = false;
  }

  return new Promise((resolve, reject) => {
    switch (req.user.Type) {
      case 'ADMINISTRATOR':
        if (wasArray === false)
          resolve(models[0]);
        else
          resolve(models);
        break;
      case 'STUDENT':
      case 'HOST':
        matchService.getUserMatches(req.user.Id)
          .then((matches) => {
            let found = models.map((model) => {
              delete model['Status'];

              if (model['Id'] !== req.user.Id) {
                delete model['ReceiveGeneralNotifications'];
                delete model['ReceiveNewMatchNotifications'];
                delete model['ReceiveMessageNotifications'];
              }

              if (!matches.find((match) => match.Status === 'APPROVED')) {
                delete model['Phone'];
                delete model['Email'];
                delete model['Status'];
              }

              return model;
            });

            if (wasArray === false)
              resolve(found[0]);
            else
              resolve(found);
          })
          .catch(reject);
        break;
    }
  });
};

let canEdit = (req, res, next) => {
  if (req.user.Type === 'ADMINISTRATOR')
    return next();

  let id = req.params.id;

  if (parseInt(id) !== req.user.Id)
    return restUtils.rejectRequest();

  return next();
};

let canAdd = (req, res, next) => {
  return next();
};

/* GET users listing. */
router.get(routeName, expressManager.loggedInGuard, function(req, res, next) {
  usersService.getAll()
    .then(serializer.serializeModels)
    .then((models) => filterModels(models, req, res))
    .then((models) => stripModels(models, req, res))
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

//getUserById
router.get(`${routeName}/:id`, expressManager.loggedInGuard, function(req, res, next) {
  let userId = req.params.id;
  usersService.getById(userId)
    .then(serializer.serializeModel)
    .then((models) => filterModels(models, req, res))
    .then((models) => stripModels(models, req, res))
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new user */
router.post(routeName, canAdd, function(req, res, next) {

  let data = req.body;

  serializer.mapDataToEntity(User, data)
    .then(entity => usersService.add(entity))
    .then(entity => usersService.validateEmail(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT */
router.put(`${routeName}/:id`, expressManager.loggedInGuard, canEdit, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  usersService.update(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST Forgot Password */
router.post(`${routeName}/forgot-password`, function(req, res, next) {

  let data = req.body;

  usersService.getByEmail(data.Email)
    .then(entity => usersService.resetPassword(entity))
    .then(() => restUtils.prepareResponse({}))
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
