/**
 * Created by Brandon Garling on 11/14/2016.
 */
const express = require('express');
const router = express.Router();
const ValidationToken = require('../models/validation-token.model');
const restUtils = require('../user_modules/rest-utils');
const serializer = require('../user_modules/serializer');

const routeName = '/tokens';

/* CONSUME TOKEN */
router.post(routeName + '/consume', function(req, res, next) {
  ValidationToken.findOne({
    where: {
        Token: req.body.Token
    }
  })
    .then(token => {
        if (token === null)
            throw "Invalid token";
        return token;
    })
    .then()
    .then(token => token.destroy())
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
