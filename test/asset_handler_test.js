var AssetHandler = require('../app/lib/asset_handler.js');

module.exports = {
  jsFile: {
    setUp: function(callback) {
      this.assetHandler = AssetHandler('some/path/file.js');
      callback();
    },
    tearDown: function(callback) {
      callback();
    },

    testNext: function(test) {
      test.expect(1);
      test.ok(!this.assetHandler.next(), 'Must return false when JS file and non lib path');
      test.done();
    },

    testGetType: function(test) {
      test.expect(1);
      test.equals(this.assetHandler.getType(), 'text/javascript; charset=utf-8');
      test.done();
    }
  },

  cssFile: {
    setUp: function(callback) {
      this.assetHandler = AssetHandler('some/path/file.css');
      callback();
    },
    tearDown: function(callback) {
      callback();
    },

    testNext: function(test) {
      test.expect(1);
      test.ok(!this.assetHandler.next(), 'Must return false when CSS file and non lib path');
      test.done();
    },

    testGetType: function(test) {
      test.expect(1);
      test.equals(this.assetHandler.getType(), 'text/css; charset=utf-8');
      test.done();
    }
  },

  libPath: {
    testNext: function(test) {
      var assetHandler = AssetHandler('some/path/lib/file.css');
      test.expect(1);
      test.ok(assetHandler.next(), 'Must return true when path includes lib');
      test.done();
    }
  },

  nonLibPathNonJSORCSSFile: {
    testNext: function(test) {
      var assetHandler = AssetHandler('some/path/file.txt');
      test.expect(1);
      test.ok(assetHandler.next(), 'Must return true when no lib in path and not a JS or CSS File');
      test.done();
    }
  },
};
