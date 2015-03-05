var Emailer = require('../app/lib/emailer.js');
var statusCode = {
  Ok: 200,
  BadRequest: 400,
  BadGateway: 502
};

module.exports = {
  validScenarios: {
    testEmailerResponseIsOk: function(test) {
      var mailgun = {
            messages: function() {
              return {send:function(data, cb){cb(undefined, data);}}
            }
          },
          data = {
            to: 'to@email.com',
            from: 'from@email.com',
            subject: 'a subject',
            text: 'Some text',
          };
      test.expect(1);
      Emailer(data, mailgun).send()
        .then(function(successCode) {
          test.equals(successCode, statusCode.Ok, 'Must be HTTP Success: 200');
          test.done();
        })
        .catch(function(err) {
          test.equals(err, statusCode.Ok, 'Must be HTTP Success: 200');
          test.done();
        });
    }
  },

  invalidScenarios: {
    setUp: function(callback) {
      this.mailgun = {};
      this.data = {
        to: 'to@email.com',
        from: 'from@email.com',
        subject: 'a subject',
        text: 'Some text',
      };
      callback();
    },

    tearDown: function(callback) {
      callback();
    },

    testEmailerResponseIsBadRequestWithInvalidToAddress: function(test) {
      this.data.to = 'invalid';
      test.expect(1);
      Emailer(this.data, this.mailgun).send()
        .then(function(successCode) {
          test.equals(successCode, statusCode.BadRequest, 'Must be HTTP BadRequest: 400');
          test.done();
        })
        .catch(function(err) {
          test.equals(err, statusCode.BadRequest, 'Must be HTTP BadRequest: 400');
          test.done();
        });
    }
  }
};
