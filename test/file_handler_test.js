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

    testNext: function(test) {
      test.expect(1);
      test.ok(!this.fileHandler.next(), 'Must return false when JS file and non lib path');
      test.done();
    },

    testGetType: function(test) {
      test.expect(1);
      test.equals(this.fileHandler.getType(), 'text/javascript; charset=utf-8');
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

    testNext: function(test) {
      test.expect(1);
      test.ok(!this.fileHandler.next(), 'Must return false when CSS file and non lib path');
      test.done();
    },

    testGetType: function(test) {
      test.expect(1);
      test.equals(this.fileHandler.getType(), 'text/css; charset=utf-8');
      test.done();
    }
  },

  libPath: {
    testNext: function(test) {
      var fileHandler = FileHandler('some/path/lib/file.css');
      test.expect(1);
      test.ok(fileHandler.next(), 'Must return true when path includes lib');
      test.done();
    }
  },

  nonLibPathNonJSORCSSFile: {
    testNext: function(test) {
      var fileHandler = FileHandler('some/path/file.txt');
      test.expect(1);
      test.ok(fileHandler.next(), 'Must return true when no lib in path and not a JS or CSS File');
      test.done();
    }
  },
};
