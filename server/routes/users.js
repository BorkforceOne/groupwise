const express = require('express');
const router = express.Router();
const User = require('../models/user');
const serializer = require('../user_modules/serializer');

/* GET users listing. */
router.get('/api/v1/users', function(req, res, next) {
  res.type('json');
  User.findAll().then(function(users) {
    let serialized = serializer.serializeModels(users, User);
    res.send(JSON.stringify(serialized));
  }).catch(function (err) {
    console.log("Error: ", err);
    res.send({'error': 'there was an error processing the request'});
  });
});

/* Add a new user */
router.post('/api/v1/users', function(req, res, next) {
  res.type('json');
  User.create(req.body).then(function (user) {
    let serialized = serializer.serializeModel(user);
    res.send(JSON.stringify(serialized));
  })
    .catch(function (err) {
      console.log("Error: ", err);
      res.send({'error': 'validation error'});
    });
});

module.exports = router;
