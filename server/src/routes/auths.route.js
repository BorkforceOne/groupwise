/**
 * Created by Brandon Garling on 11/14/2016.
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const encryptionManager = require('../user_modules/encryption-manager');
const socketManager = require('../user_modules/socket-manager');
const ErrorModule = require('../error');
const AppError = ErrorModule.AppError;
const AppErrorTypes = ErrorModule.AppErrorTypes;

const routeName = '/auth';

/* LOGIN REQUEST */
router.post(routeName + '/login', function(req, res, next) {
    let foundUser = null;

    User.findOne({
      where: {
        Email: req.body.Email
      },
      include: [User.ValidationTokens]
    })
      .then(user => {
        if (user === null)
          throw "Invalid email or password";
        foundUser = user;
        return user;
      })
      .then(user => encryptionManager.validiateHash(req.body.Password, user.Salt, user.Password))
      .then(result => {
        if (result === false)
          throw new AppError("Invalid email or password", AppErrorTypes.OTHER, 403);

        // Check if user still needs to validate their email
        if (foundUser.ValidationTokens.find((token) => token.Type === 'REGISTRATION'))
          throw new AppError("You must confirm you email address before logging in", AppErrorTypes.OTHER, 403);

        // Check if user is banned
        if (foundUser.Status === 'BANNED')
          throw new AppError("Your account has been banned or rejected", AppErrorTypes.OTHER, 403);

        // Check if user is pending review
        if (foundUser.Status === 'PENDING_REVIEW')
          throw new AppError("Your account is pending administrator review, we'll let you know when that review has been completed", AppErrorTypes.OTHER, 403);

        // Everything's good, log em in
        req.session.userId = foundUser.Id;

        return foundUser;
      })
      .then(serializer.serializeModel)
      .then(restUtils.prepareResponse)
      .then(payload => restUtils.sendResponse(payload, req, res))
      .catch(error => restUtils.catchErrors(error, req, res));
});

/* LOGOUT REQUEST */
router.post(routeName + '/logout', function(req, res, next) {
    req.session.userId = undefined;

    restUtils.prepareResponse({}, [])
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});

router.post(routeName, function(req, res, next) {
  if (req.session.userId) {
    User.findOne({
      where: {
        Id: req.session.userId
      }
    })
      .then(user => {
        if (user === false)
          throw new AppError("Could not find authenticated user", AppErrorTypes.NOT_FOUND, 403);

        return user;
      })
      .then(serializer.serializeModel)
      .then(restUtils.prepareResponse)
      .then(payload => restUtils.sendResponse(payload, req, res))
      .catch(error => restUtils.catchErrors(error, req, res));
  }
  else {
    res.sendStatus(403);
  }
});


module.exports = router;
