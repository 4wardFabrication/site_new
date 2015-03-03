module.exports = {
  setUp: function(callback) {

    callback();
  },

  tearDown: function(callback) {

    callback();
  },

  testSomething: function(test) {
    test.expect(1);
    test.ok(true, true);
    test.done();
  }
}
