const express = require('express');
const router = express.Router();
const Config = require('../models/config');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

const routeName = '/config';

/* GET all listing. */
router.get(routeName, function(req, res, next) {
  Config.findAll()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* GET single listing. */
router.get(`${routeName}/:key`, function(req, res, next) {
  Config.findOne({
    where: {
      Key: req.params.key
    }
  })
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new config */
router.post(`${routeName}/:key`, function(req, res, next) {

  let data = {
    'Key': req.params.key,
    'Value': JSON.stringify(req.body.Value)
  };

  Config.findOne({
    where: {
      Key: data.Key
    }
  })
    .then(kvp => {

      if (kvp === null)
        return new Promise((resolve, reject) => {
          let newEntity = Config.build();

          newEntity['Key'] = data.Key;
          newEntity['Value'] = data.Value;

          resolve(newEntity);
        });
      else {
        kvp.Value = data.Value;
        return kvp;
      }
    })
    .then(entity => entity.save())
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
