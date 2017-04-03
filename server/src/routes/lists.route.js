const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

const listsService = require('../services/lists.service');

const Lists = require('../models/lists.model');

let routeName;

// Attribute Strings

routeName = '/lists';

/* GET */
router.get(routeName, function(req, res, next) {
  listsService.getAllLists()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(Lists, data)
    .then(entity => listsService.addList(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  listsService.updateList(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  listsService.deleteList(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
