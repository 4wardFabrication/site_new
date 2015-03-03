var Emailer = function(data, mailgun) {
  this.data = data;
  this.mailgun = mailgun;
  this.regexps = {
    email: new RegExp('^[^@]+@[^@]+$'),
    text: new RegExp('.{5}')
  };
};

Emailer.prototype.isValid = function() {
  if(!this.data) {
    return false;
  }
  return  this.regexps.email.test(this.data.to) &&
          this.regexps.email.test(this.data.from) &&
          this.regexps.text.test(this.data.text);
};

Emailer.prototype.send = function() {
  return this.mailgun.messages().send(this.data);
};

module.exports = Emailer;
