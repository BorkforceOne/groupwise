const express = require('express');
const router = express.Router();
const Attachment = require('../models/attachment');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const fs = require('fs');
const mime = require('mime');

const routeName = '/attachments';

/* GET exiting entites */
router.get(routeName, function(req, res, next) {
  Attachment.findAll()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

router.get(routeName + '/:id/file', function(req, res, next) {

  Attachment.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(entry) {
      res.setHeader("Content-Type", mime.lookup(entry.get('Filename')));
      res.send(entry.get('Data'));
    })
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new entity */
router.post(routeName, function(req, res, next) {
  let data = {
    'Filename': req.body.Filename,
    'UserId': req.session.userId
  };

  let newEntity = Attachment.build();

  newEntity['Filename'] = data.Filename;
  newEntity['UserId'] = data.UserId;

  newEntity.save()
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res))
});

/* Add a new entity */
router.put(routeName + '/:id/file', function(req, res, next) {
  let data = {
    'Data': fs.readFileSync(req.files.File.file)
  };

  Attachment.findOne({
    where: {
      id: req.params.id
    }
  }).then(entity => {
    if (entity === null)
      throw "Entity does not exist";

    entity['Data'] = data.Data;

    return entity;
  })
    .then(entity => entity.save())
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res))
});

module.exports = router;
