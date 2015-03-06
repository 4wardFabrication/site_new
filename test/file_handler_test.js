var FileHandler = require('../app/lib/file_handler.js');

module.exports = {
  jsFile: {
    setUp: function(callback) {
      this.fileHandler = FileHandler('some/path/file.js');
      callback();
    },
    tearDown: function(callback) {
      callback();
    },

    testIsJSReturnsTrue: function(test) {
      test.expect(1);
      test.ok(this.fileHandler.isJS(), 'Must return true when path points to a JS file');
      test.done();
    },
    testIsCSSReturnsFalse: function(test) {
      test.expect(1);
      test.ok(!this.fileHandler.isCSS(), 'Must return false when path points to a CSS file');
      test.done();
    }
  },

  cssFile: {
    setUp: function(callback) {
      this.fileHandler = FileHandler('some/path/file.css');
      callback();
    },
    tearDown: function(callback) {
      callback();
    },

    testIsJSReturnsFalse: function(test) {
      test.expect(1);
      test.ok(!this.fileHandler.isJS(), 'Must return false when path points to a JS file');
      test.done();
    },
    testIsCSSReturnsTrue: function(test) {
      test.expect(1);
      test.ok(this.fileHandler.isCSS(), 'Must return true when path points to a CSS file');
      test.done();
    },
    testIsLibReturnsFalse: function(test) {
      test.expect(1);
      test.ok(!this.fileHandler.isLib(), 'Must return false when path does not include lib');
      test.done();
    }
  },

  nonLibPath: {
    testIsLibReturnsFalse: function(test) {
      var fileHandler = FileHandler('some/path/file.txt');
      test.expect(1);
      test.ok(!fileHandler.isLib(), 'Must return false when path does not include lib');
      test.done();
    }
  },

  libPath: {
    testIsLibReturnsTrue: function(test) {
      var fileHandler = FileHandler('some/path/lib/file.css');
      test.expect(1);
      test.ok(fileHandler.isLib(), 'Must return true when path includes lib');
      test.done();
    }
  },
};
