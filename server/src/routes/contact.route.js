const express = require('express');
const router = express.Router();
const restUtils = require('../user_modules/rest-utils');
const serializer = require('../user_modules/serializer');

const contactService = require('../services/contact.service');

const routeName = '/contact';

router.post(`${routeName}`, function(req, res, next) {
  let content = {};
  content['Message'] = req.body['Message'];
  content['Name'] = req.body['Name'];
  content['From'] = req.body['From'];

  contactService.notify(content)
    .then(() => restUtils.prepareResponse({}))
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
