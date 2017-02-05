/**
 * Created by Brandon Garling on 11/14/2016.
 */
const express = require('express');
const router = express.Router();
const ValidationToken = require('../models/validation-token.model');
const restUtils = require('../user_modules/rest-utils');

const routeName = '/tokens';

/* CONSUME TOKEN */
router.post(routeName + '/consume', function(req, res, next) {
  ValidationToken.findOne({
    where: {
        Code: req.body.Code
    }
  })
  .then(token => {
      if (token === null)
          throw "Invalid tokensRoute code";
      return token;
  })
  .then(token => token.destroy())
  .then(() => {
    return {};
  })
  .then(restUtils.prepareResponse)
  .then(payload => restUtils.sendResponse(payload, req, res))
  .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
