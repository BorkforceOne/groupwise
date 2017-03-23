const router = require('express').Router();

let normalizedPath = require("path").join(__dirname);

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if (file.match(/\.route\.js/)) {
    let route = require("./" + file);
    console.log("[ROUTES] Loading route '" + file + "'");
    router.use('/', route);
  }
});

module.exports = router;
