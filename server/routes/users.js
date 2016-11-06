const express = require('express');
const router = express.Router();
const User = require('../models/user');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

/* GET users listing. */
router.get('/api/v1/users', function(req, res, next) {
  res.type('json');
  User.findAll()
    .then(function(users) {
      let serialized = serializer.serializeModels(users, User);
      let response = restUtils.prepareResponse(serialized);
      res.send(JSON.stringify(response));
    }).catch(function (err) {
      console.log("Error: ", err);
      let response = restUtils.prepareResponse({}, ["There was an error processing the request"]);
      res.send(JSON.stringify(response));
    });
});

/* Add a new user */
router.post('/api/v1/users', function(req, res, next) {
  res.type('json');
  User.create(req.body)
    .then(function (user) {
      let serialized = serializer.serializeModel(user);
      let response = restUtils.prepareResponse(serialized);
      res.send(JSON.stringify(response));
    })
    .catch(function (err) {
      console.log("Error: ", err);
      let response = restUtils.prepareResponse({}, ["There was an error processing the request"]);
      res.send(JSON.stringify(response));
    });
});

module.exports = router;
