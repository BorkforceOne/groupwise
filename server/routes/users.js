const express = require('express');
const router = express.Router();
const User = require('../models/user');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const mailerManager = require('../user_modules/mailer-manager');

const routeName = '/users';

/* GET users listing. */
router.get(routeName, function(req, res, next) {
  User.findAll()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new user */
router.post(routeName, function(req, res, next) {
  new Promise((resolve, reject) => {
    let data = {
      'Firstname': req.body.Firstname,
      'Lastname': req.body.Lastname,
      'Email': req.body.Email,
      'Type': req.body.Type
    };

    let newEntity = User.build();

    newEntity['Firstname'] = data.Firstname;
    newEntity['Lastname'] = data.Lastname;
    newEntity['Email'] = data.Email;
    newEntity['Type'] = data.Type;

    resolve (newEntity);
  })
    .then(entity => entity.changePassword(req.body.Password))
    .then(entity => entity.save())
    .then(entity => {
      let mail = mailerManager.generateTemplate('FlagFriends Account', 'This is to inform you of your new account on FlagFriends!', '<b>Dear {{Firstname}} {{Lastname}},</b><br/><p>This is to inform you of your new account on FlagFriends!</p><br/>');
      mail({
        to: entity.Email
      }, {
        Firstname: entity.Firstname,
        Lastname: entity.Lastname
      }, function(err){
        if(err)
          console.log('[Mailer] [Error]: ', err);
      });
      return entity;
    })
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
