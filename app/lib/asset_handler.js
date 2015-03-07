var fs = require('fs'),
    path = require('path'),
    UglifyJS = require('uglify-js'),
    CSSMin = require('cssmin');

var AssetHandler = function(filepath) {
  var _ = {
    filepath: filepath,
    extName: path.extname(filepath),
    ext: {
      js: '.js',
      css: '.css'
    },
    key: path.extname(filepath).replace('.', ''),
    type: {
      js: 'text/javascript; charset=utf-8',
      css: 'text/css; charset=utf-8'
    },
    renderers: {
      js: function() {
        return UglifyJS.minify(_.filepath).code;
      },
      css: function() {
        var css = fs.readFileSync(_.filepath, 'utf8');
        return CSSMin.call({}, css);
      }
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

    getBody: function() {
      return _.renderers[_.key]();
    },

    getType: function() {
      return _.type[_.key];
    },

    next: function() {
      return  _.hasLibDirectory() ||
              ( !_.isJS() &&
                !_.isCSS() );
    }
  };

  return {
    getBody: _.getBody,
    getType: _.getType,
    next: _.next
  };
};

module.exports = AssetHandler;
