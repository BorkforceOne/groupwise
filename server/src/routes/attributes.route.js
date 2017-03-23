const express = require('express');
const router = express.Router();
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const attributesService = require('../services/attributes.service');

const AttributeString = require('../models/attribute-string.model');
const AttributeStringValue = require('../models/attribute-string-value.model');
const AttributeDate = require('../models/attribute-date.model');
const AttributeDateValue = require('../models/attribute-date-value.model');
const AttributeRange = require('../models/attribute-range.model');
const AttributeRangeValue = require('../models/attribute-range-value.model');
const AttributeEnum = require('../models/attribute-enum.model');
const AttributeEnumValue = require('../models/attribute-enum-value.model');


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

  serializer.mapDataToEntity(AttributeString, data)
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
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeStringValues()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

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

  serializer.mapDataToEntity(AttributeStringValue, data)
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

  serializer.mapDataToEntity(AttributeDate, data)
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
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeDateValues()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

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

  serializer.mapDataToEntity(AttributeDateValue, data)
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

// Attribute Ranges

routeName = '/attribute-ranges';

/* GET attribute-range listings. */
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeRanges()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-range. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(AttributeRange, data)
    .then(entity => attributesService.addAttributeRange(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-range. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeRange(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE attribute-range. */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  attributesService.deleteAttributeRange(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

routeName = '/attribute-range-values';

/* GET attribute-range-value listings. */
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeRangeValues()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* GET attribute-range-value listings. */
router.get(`${routeName}/:userId`, function(req, res, next) {
  let userId = req.params.userId;

  attributesService.getAllAttributeRangeValues(userId)
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-range-value. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(AttributeRangeValue, data)
    .then(entity => attributesService.addAttributeRangeValue(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-range-value. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeRangeValue(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

// Attribute Enums

routeName = '/attribute-enums';

/* GET attribute-enum listings. */
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeEnums()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-enum. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(AttributeEnum, data)
    .then(entity => attributesService.addAttributeEnum(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-enum. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeEnum(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* DELETE attribute-enum. */
router.delete(`${routeName}/:id`, function(req, res, next) {
  let id = req.params.id;

  attributesService.deleteAttributeEnum(id)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

routeName = '/attribute-enum-values';

/* GET attribute-enum-value listings. */
router.get(routeName, function(req, res, next) {
  attributesService.getAllAttributeEnumValues()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* GET attribute-enum-value listings. */
router.get(`${routeName}/:userId`, function(req, res, next) {
  let userId = req.params.userId;

  attributesService.getAllAttributeEnumValues(userId)
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* POST attribute-enum-value. */
router.post(routeName, function(req, res, next) {
  let data = req.body;

  serializer.mapDataToEntity(AttributeEnumValue, data)
    .then(entity => attributesService.addAttributeEnumValue(entity))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* PUT attribute-enum-value. */
router.put(`${routeName}/:id`, function(req, res, next) {
  let data = req.body;
  data.Id = req.params.id;

  attributesService.updateAttributeEnumValue(data)
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
