var Emailer = function(data, mailgun) {
  var _ = {
    data: data,
    mailgun: mailgun,
    regexps: {
      email: new RegExp('^[^@]+@[^@]+$'),
      text: new RegExp('.{5}')
    },
    statusCode: {
      Ok: 200,
      BadRequest: 400,
      BadGateway: 502
    },

    isValid: function() {
      return  typeof(_.data) !== 'undefined' &&
              _.regexps.email.test(_.data.to) &&
              _.regexps.email.test(_.data.from) &&
              _.regexps.text.test(_.data.text);
    },

    send: function() {
      return new Promise(
        function(resolve, reject) {
          if(!_.isValid()) {
            reject(_.statusCode.BadRequest);
          } else {
            _.mailgun.messages().send(_.data, function(err, data) {
              if(err) {
                reject(err.statusCode || _.statusCode.BadGateway);
              } else {
                resolve(_.statusCode.Ok);
              }
            });
          }
        }
      ).then(
        function(successCode) { return successCode; },
        function(failureCode) { return failureCode; }
      );
    }
  };

  return {
    send: _.send
  }
};

module.exports = Emailer;
