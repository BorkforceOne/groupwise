const express = require('express');
const router = express.Router();
const Attachment = require('../models/attachment.model');
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

router.get(routeName + '/:id', function(req, res, next) {
  // Send a JSON response if one is requested
  if (req.headers.accept === 'application/json') {
    Attachment.findOne({
      where: {
        Id: req.params.id
      }
    })
      .then(serializer.serializeModel)
      .then(restUtils.prepareResponse)
      .then(payload => restUtils.sendResponse(payload, req, res))
      .catch(error => restUtils.catchErrors(error, req, res));
  }
  // Otherwise we send the file itself
  else {
    Attachment.findOne({
      where: {
        Id: req.params.id
      }
    }).then(function(entry) {
      res.setHeader("Content-Type", entry.get('MimeType'));
      res.setHeader("Content-Disposition", `inline; filename=${entry.get('Filename')}`);
      res.send(entry.get('Data'));
    })
      .catch(error => restUtils.catchErrors(error, req, res));
  }
});

/* Add a new entity */
router.post(routeName, function(req, res, next) {
  restUtils.authenticate(req)
    .then(user => {
      let data = {
        'Data': fs.readFileSync(req.files.file.file),
        'Filename': req.files.file.filename,
        'MimeType': req.files.file.mimetype,
        'UserId': user.Id
      };

      let newEntity = Attachment.build();

      newEntity['Filename'] = data.Filename;
      newEntity['UserId'] = data.UserId;
      newEntity['MimeType'] = data.MimeType;
      newEntity['Data'] = data.Data;

      return newEntity;
    })
    .then(entity => entity.save())
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res))
});

module.exports = router;
