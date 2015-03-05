var Emailer = require('../app/lib/emailer.js');
var statusCode = {
  Ok: 200,
  BadRequest: 400,
  BadGateway: 502
};

exports.validScenarios = {
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
      .then(function(successCode) { test.equals(successCode, statusCode.Ok, 'Must be HTTP Success: 200'); test.done();})
      .catch(function(err) { test.equals(err, statusCode.Ok, 'Must be HTTP Success: 200'); test.done();})
  }
}

exports.inValidScenarios = {
};
