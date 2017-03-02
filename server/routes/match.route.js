const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

const matchService = require('../services/match.service');

const Match = require('../models/match.model');

let routeName;

// Attribute Strings

routeName = '/matches';

/* GET */
router.get(routeName, function(req, res, next) {
  matchService.getAllMatches()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(Match, data)
    .then(entity => matchService.addMatch(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  matchService.updateMatch(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  matchService.deleteMatch(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
