/**
 * Created by Brandon Garling on 11/14/2016.
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const encryption = require('../user_modules/encryption');

const routeName = '/auth';

/* LOGIN REQUEST */
router.post(routeName + '/login', function(req, res, next) {
    let foundUser = null;
    User.findOne({
        where: {
            Email: req.body.Email
        }
    })
        .then(user => {
            if (user === null)
                throw "Invalid email or password";
            foundUser = user;
            return user;
        })
        .then(user => encryption.validiateHash(req.body.Password, user.Salt, user.Password))
        .then(result => {
            if (result === false)
                throw "Invalid email or password";
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
    req.session.destroy();

    restUtils.prepareResponse({}, [])
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});


module.exports = router;
