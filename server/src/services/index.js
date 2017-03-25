
const init = function () {
  let normalizedPath = require("path").join(__dirname);

  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if (file.match(/\.service\.js/)) {
      let service = require("./" + file);
      service.init();
      console.log("[SERVICE] Loading service '" + file + "'");
    }
  });
};

module.exports.init = init;
