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
    }
  };

  return {
    isJS: _.isJS,
    isCSS: _.isCSS,
    isLib: _.isLib
  };
};

module.exports = FileHandler;
