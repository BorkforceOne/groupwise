const models = {};

let normalizedPath = require("path").join(__dirname);

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if (file.match(/\.model\.js/)) {
    models[file] = require("./" + file);
    console.log("[MODELS] Loading model '" + file + "'");
  }
});

module.exports = models;
