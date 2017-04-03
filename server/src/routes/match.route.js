const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const expressManager = require('../user_modules/express-manager');

const matchService = require('../services/match.service');

const Match = require('../models/match.model');

let routeName;

// Attribute Strings

routeName = '/matches';

let canEdit = (req, res, next) => {
  if (req.user.Type === 'ADMINISTRATOR')
    return next();

  matchService.getMatch(req.params.id)
    .then((model) => {
      if (model === null) {
        res.status(404);
        res.send();
        return;
      }

      switch (req.user.Type) {
        case 'STUDENT':
          if (req.body.StudentUserId !== req.user.Id || req.body.StudentUserId !== model.StudentUserId)
            return restUtils.rejectRequest();

          if (req.body.Status !== model.Status) {
            // Only the student can accept a match
            if (req.body.Status === 'APPROVED' && model.Status !== 'PROPOSED')
              return restUtils.rejectRequest();
            // Cannot move back to proposed
            if (req.body.Status === 'PROPOSED')
              return restUtils.rejectRequest();
            if (req.body.Status === 'UNMATCHED' && model.Status !== 'APPROVED')
              return restUtils.rejectRequest();
          }
          break;
        case 'HOST':
          if (req.body.HostUserId !== req.user.Id || req.body.HostUserId !== model.HostUserId)
            return restUtils.rejectRequest();

          if (req.body.Status !== model.Status) {
            // Only the student can accept a match
            if (req.body.Status === 'APPROVED')
              return restUtils.rejectRequest();
            // Cannot move back to proposed
            if (req.body.Status === 'PROPOSED')
              return restUtils.rejectRequest();
            if (req.body.Status === 'UNMATCHED' && model.Status !== 'APPROVED')
              return restUtils.rejectRequest();
          }
          break;
      }

      next();
    })
    .catch((e) => {
      res.status(400);
      res.send();
    });
};

let canAdd = (req, res, next) => {
  if (req.user.Type === 'ADMINISTRATOR')
    return next();

  switch (req.user.Type) {
    case 'STUDENT':
      if (req.body.StudentUserId !== req.user.Id)
        return restUtils.rejectRequest();
      break;
    case 'HOST':
      if (req.body.HostUserId !== req.user.Id)
        return restUtils.rejectRequest();
      break;
  }

  next();
};

/* GET */
router.get(routeName, expressManager.loggedInGuard, function(req, res, next) {
  matchService.getAllMatches()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST */
router.post(routeName, expressManager.loggedInGuard, canAdd, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(Match, data)
    .then(entity => matchService.addMatch(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT */
router.put(`${routeName}/:id`, expressManager.loggedInGuard, canEdit, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  matchService.updateMatch(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE
// Not using currently
router.delete(`${routeName}/:id`, expressManager.loggedInGuard, function(req, res, next) {
  let id = req.params.id;

  matchService.deleteMatch(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});*/

module.exports = router;
