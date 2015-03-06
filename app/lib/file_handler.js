var path = require('path'),
    UglifyJS = require('uglify-js'),
    CSSMin = require('cssmin');

var FileHandler = function(filepath) {
  var _ = {
    filepath: filepath,
    extName: path.extname(filepath),
    ext: {
      js: '.js',
      css: '.css'
    },
    type: {
      js: 'text/javascript; charset=utf-8',
      css: 'text/css; charset=utf-8'
    },

    isJS: function() {
      return _.extName === _.ext.js;
    },

    isCSS: function() {
      return _.extName === _.ext.css;
    },

    hasLibDirectory: function() {
      return _.filepath.split(path.sep).indexOf('lib') > -1;
    },

    getType: function() {
      var key = _.extName.replace('.', '');
      return _.type[key];
    },

    next: function() {
      return  _.hasLibDirectory() ||
              ( !_.isJS() &&
                !_.isCSS() );
    }
  };

  return {
    getType: _.getType,
    next: _.next
  };
};

module.exports = FileHandler;
