this.ContactForm = function(element, url, alerts) {
  var _ = {
      element: element,
      apiUrl: url,
      domComponents: {
        form: element.find('form'),
        subject: element.find('input#subject'),
        from: element.find('input#from'),
        text: element.find('textarea#text'),
        send: element.find('button#send')
      },
      alerts: alerts,
      messages: {
        invalid_form: '<strong>Uh oh!</strong> Please enter an email and some details about your request.',
        send_pending: '<strong>Hold up!</strong> We are attempting to send your request.',
        send_success: '<strong>Got it!</strong> We will respond within 48 hours. Thank you!',
        send_error: '<strong>Well this is embarrassing!</strong> There was an issue sending your request. We apologise for any inconvenience.'
      },
      validations: {
        email: new RegExp('^[^@]+@[^@]+$'),
        text: new RegExp('.{5}')
      },
      divertKeyPress: function(form, cb) {
        form.submit(function() {
          cb();
          return false;
        });
      },
      send: function() {
        if(_.validate()) {
          _.alerts.showInfo(_.messages.send_pending);
          $.post( _.apiUrl,
                  { subject: _.domComponents.subject.val(),
                    from: _.domComponents.from.val(),
                    text: _.domComponents.text.val() },
                  function() {
                    _.alerts.showSuccess(_.messages.send_success);
                  }
                ).fail(function() {
                  _.alerts.showError(_.messages.send_error);
                });
        }
      },
      formatAsValid: function(field) {
        field.parent().removeClass('has-error');
      },
      formatAsInvalid: function(field) {
        field.parent().addClass('has-error');
      },
      validateFrom: function() {
        return _.validateField(_.validations.email, _.domComponents.from);
      },
      validateText: function() {
        return _.validateField(_.validations.text, _.domComponents.text);
      },
      validateField: function(regex, field) {
        if(regex.test(field.val())) {
          _.formatAsValid(field);
          return true;
        }
        _.formatAsInvalid(field);
        return false;
      },
      validate: function() {
        var valid = _.validateFrom() & _.validateText();
        if(valid) {
          _.alerts.hide();
        } else {
          _.alerts.showError(_.messages.invalid_form);
        }
        return valid;
      }
    };

  _.divertKeyPress(_.domComponents.form, _.send);
  _.domComponents.from.on('change', _.validateFrom);
  _.domComponents.text.on('change', _.validateText);
  _.domComponents.send.on('click', _.send);
};
