function QuoteForm(url, alerts) {
  this.apiUrl = url;
  this.element = $('#quoteform');
  this.fields = {
    subject: this.element.find('#subject'),
    from: this.element.find('#from'),
    body: this.element.find('#body')
  };
  this.alerts = alerts;
  this.messages = {
    invalid_form: '<strong>Uh oh!</strong> Please enter an email and some details about your request.',
    send_pending: '<strong>Hold up!</strong> We are attempting to send your request.',
    send_success: '<strong>Got it!</strong> We will respond within 48 hours. Thank you!',
    send_error: '<strong>Well this is embarrassing!</strong> There was an issue sending your request. We apologise for any inconvenience.'
  };
  this.validations = {
    email: new RegExp('^[^@]+@[^@]+$'),
    body: new RegExp('.{5}')
  };

  function divertKeyPress(self) {
    self.element.find('form').submit(function() {
      self.send();
      return false;
    });
  };

  divertKeyPress(this);
};

QuoteForm.prototype.send = function() {
  var self = this;
  if(self.validate()) {
    self.alerts.showInfo(self.messages.send_pending);
    $.ajax({
      type: 'POST',
      url: self.apiUrl,
      data: JSON.stringify({
        subject: self.fields.subject.val(),
        from: self.fields.from.val(),
        body: self.fields.body.val()
      })
    })
    .success(function() {
      self.alerts.showSuccess(self.messages.send_success);
    })
    .error(function() {
      self.alerts.showError(self.messages.send_error);
    });
  }
};

QuoteForm.prototype.formatAsValid = function(field) {
  field.parent().removeClass('has-error');
};

QuoteForm.prototype.formatAsInvalid = function(field) {
  field.parent().addClass('has-error');
};

QuoteForm.prototype.validateFrom = function() {
  return this.validateField(this.validations.email, this.fields.from);
};

QuoteForm.prototype.validateBody = function() {
return this.validateField(this.validations.body, this.fields.body);
};

QuoteForm.prototype.validateField = function(regex, field) {
  if(regex.exec(field.val())) {
    this.formatAsValid(field);
    return true;
  }
  this.formatAsInvalid(field);
  return false;
};

QuoteForm.prototype.validate = function() {
  var valid = this.validateFrom() & this.validateBody();
  if(valid) {
    this.alerts.hide();
  } else {
    this.alerts.showError(this.messages.invalid_form);
  }
  return valid;
};
