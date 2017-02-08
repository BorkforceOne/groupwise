const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const attributesService = require('../services/attributes.service');

const AttributeString = require('../models/attribute-string.model');
const AttributeStringValue = require('../models/attribute-string-value.model');
const AttributeDate = require('../models/attribute-date.model');
const AttributeDateValue = require('../models/attribute-date-value.model');


let routeName;

// Attribute Strings

routeName = '/attribute-strings';

/* GET attribute-string listings. */
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeStrings()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-string. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  restUtils.mapDataToEntity(AttributeString, data)
    .then(entity => attributesService.addAttributeString(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-string. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeString(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE attribute-string. */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  attributesService.deleteAttributeString(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

routeName = '/attribute-string-values';

/* GET attribute-string-value listings. */
router.get(`${routeName}/:userId`, function(req, res, next) {
  let userId = req.params.userId;

  attributesService.getAllAttributeStringValues(userId)
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-string-value. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  restUtils.mapDataToEntity(AttributeStringValue, data)
    .then(entity => attributesService.addAttributeStringValue(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-string-value. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeStringValue(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

// Attribute Dates

routeName = '/attribute-dates';

/* GET attribute-date listings. */
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeDates()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-date. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  restUtils.mapDataToEntity(AttributeDate, data)
    .then(entity => attributesService.addAttributeDate(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-date. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeDate(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE attribute-date. */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  attributesService.deleteAttributeDate(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

routeName = '/attribute-date-values';

/* GET attribute-date-value listings. */
router.get(`${routeName}/:userId`, function(req, res, next) {
  let userId = req.params.userId;

  attributesService.getAllAttributeDateValues(userId)
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-date-value. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  restUtils.mapDataToEntity(AttributeDateValue, data)
    .then(entity => attributesService.addAttributeDateValue(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-date-value. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeDateValue(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
