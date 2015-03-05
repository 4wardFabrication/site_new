var Emailer = require('../app/lib/emailer.js');
var statusCode = {
  Ok: 200,
  BadRequest: 400,
  BadGateway: 502,
  MailgunErrorCode: 504
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
        .then(function(response) {
          test.equals(response, statusCode.Ok, 'Must be HTTP Success: 200');
          test.done();
        });
    }
  },

  invalidScenarios: {
    setUp: function(callback) {
      this.mailgun = {},
      this.data = {
        to: 'to@email.com',
        from: 'from@email.com',
        subject: 'a subject',
        text: 'Some text'
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
        .then(function(response) {
          test.equals(response, statusCode.BadRequest, 'Must be HTTP BadRequest: 400');
          test.done();
        });
    },

    testEmailerResponseIsBadRequestWithInvalidFromAddress: function(test) {
      this.data.from = 'invalid';
      test.expect(1);
      Emailer(this.data, this.mailgun).send()
        .then(function(response) {
          test.equals(response, statusCode.BadRequest, 'Must be HTTP BadRequest: 400');
          test.done();
        });
    },

    testEmailerResponseIsBadRequestWithInvalidText: function(test) {
      this.data.text = 'abc';
      test.expect(1);
      Emailer(this.data, this.mailgun).send()
        .then(function(response) {
          test.equals(response, statusCode.BadRequest, 'Must be HTTP BadRequest: 400');
          test.done();
        });
    },

    testEmailerResponseIsErrorStatusCodeFromMailgun: function(test) {
      this.mailgun = {
        messages: function() {
          return {send:function(data, cb){cb({statusCode: 504}, data);}}
        }
      };
      test.expect(1);
      Emailer(this.data, this.mailgun).send()
        .then(function(response) {
          test.equals(response, statusCode.MailgunErrorCode, 'Must be Mailgun handled Error Code: 504');
          test.done();
        });
    },

    testEmailerResponseIsBadGateway: function(test) {
      this.mailgun = {
        messages: function() {
          return {send:function(data, cb){cb({}, data);}}
        }
      };
      test.expect(1);
      Emailer(this.data, this.mailgun).send()
        .then(function(response) {
          test.equals(response, statusCode.BadGateway, 'Must be HTTP BadGateway: 502');
          test.done();
        });
    }
  }
};
