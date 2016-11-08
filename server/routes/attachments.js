const express = require('express');
const router = express.Router();
const Attachment = require('../models/attachment');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const fs = require('fs');
const mime = require('mime');

/* GET exiting entites */
router.get('/api/v1/attachments', function(req, res, next) {
  res.type('json');
  Attachment.findAll()
    .then(function(entries) {
      let serialized = serializer.serializeModels(entries);
      let response = restUtils.prepareResponse(serialized);
      res.send(JSON.stringify(response));
    }).catch(function (err) {
      console.log("Error: ", err);
      let response = restUtils.prepareResponse({}, ["There was an error processing the request"]);
      res.send(JSON.stringify(response));
    });
});

router.get('/api/v1/attachments/:id/file', function(req, res, next) {

  Attachment.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(entries) {
      res.setHeader("Content-Type", mime.lookup(entries[0].get('Filename')));
      res.send(entries[0].get('Data'));
    }).catch(function (err) {
      res.type('json');
      console.log("Error: ", err);
      let response = restUtils.prepareResponse({}, ["There was an error processing the request"]);
      res.send(JSON.stringify(response));
    });
});

/* Add a new entity */
router.post('/api/v1/attachments', function(req, res, next) {
  res.type('json');
  let attachment = {};
  attachment['Filename'] = req.body.Filename;
  attachment['UserId'] = 1;

  Attachment.create(attachment)
    .then(function (entry) {
      let serialized = serializer.serializeModel(entry);
      let response = restUtils.prepareResponse(serialized);
      res.send(JSON.stringify(response));
    })
    .catch(function (err) {
      console.log("Error: ", err);
      let response = restUtils.prepareResponse({}, ["There was an error processing the request"]);
      res.send(JSON.stringify(response));
    });
});

/* Add a new entity */
router.put('/api/v1/attachments/:id/file', function(req, res, next) {
  res.type('json');
  let attachment = {};
  attachment['Data'] = fs.readFileSync(req.files.File.file);

  Attachment.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(entries) {
    entries[0].update(attachment)
      .then(function(entry) {
        let serialized = serializer.serializeModel(entry);
        let response = restUtils.prepareResponse(serialized);
        res.send(JSON.stringify(response));
      })
  }).catch(function (err) {
    res.type('json');
    console.log("Error: ", err);
    let response = restUtils.prepareResponse({}, ["There was an error processing the request"]);
    res.send(JSON.stringify(response));
  });
});

module.exports = router;
