var path = require('path');

var FileHandler = function(filepath) {
  var _ = {
    filepath: filepath,
    extName: path.extname(filepath),
    ext: {
      js: '.js',
      css: '.css'
    },

    isJS: function() {
      return _.extName === _.ext.js;
    },

    isCSS: function() {
      return _.extName === _.ext.css;
    },

    isLib: function() {
      return _.filepath.split(path.sep).indexOf('lib') > -1;
    },

    headers: {
      JS: 'text/javascript; charset=utf-8',
      CSS: 'text/css; charset=utf-8'
    }
  };

  return {
    isJS: _.isJS,
    isCSS: _.isCSS,
    isLib: _.isLib,
    headers: _.headers
  };
};

module.exports = FileHandler;
