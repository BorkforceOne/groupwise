const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const expressManager = require('../user_modules/express-manager');

const listsService = require('../services/lists.service');

const Lists = require('../models/lists.model');

let routeName;

let adminCanGuard = (req, res, next) => {
  if (req.user.Type === 'ADMINISTRATOR')
    return next();

  return restUtils.rejectRequest();
};

routeName = '/lists';

/* GET */
router.get(routeName, expressManager.loggedInGuard, adminCanGuard, function(req, res, next) {
  listsService.getAllLists()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST */
router.post(routeName, expressManager.loggedInGuard, adminCanGuard, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(Lists, data)
    .then(entity => listsService.addList(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT */
router.put(`${routeName}/:id`, expressManager.loggedInGuard, adminCanGuard, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  listsService.updateList(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE */
router.delete(`${routeName}/:id`, expressManager.loggedInGuard, adminCanGuard, function(req, res, next) {
  let id = req.params.id;

  listsService.deleteList(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
