(function() {
  var alerts = new Alerts($('div#alerts')),
      form = new Form('/api/emailer'),
      contactForm = $('section#contactform'),
      domComponents = {
        form: contactForm.find('form'),
        subject: contactForm.find('input#subject'),
        from: contactForm.find('input#from'),
        text: contactForm.find('textarea#text'),
        send: contactForm.find('button#send')
      },
      messages = {
        invalid_form: '<strong>Uh oh!</strong> Please enter an email and some details about your request.',
        send_pending: '<strong>Hold up!</strong> We are attempting to send your request.',
        send_success: '<strong>Got it!</strong> We will respond within 48 hours. Thank you!',
        send_error: '<strong>Well this is embarrassing!</strong> There was an issue sending your request. We apologise for any inconvenience.'
      },
      validations = {
        email: new RegExp('^[^@]+@[^@]+$'),
        text: new RegExp('.{5}')
      },

      validateFrom = function() {
        return form.validateField(domComponents.from, validations.email);
      },

      validateText = function() {
        return form.validateField(domComponents.text, validations.text);
      },

      validate = function() {
        var valid = validateFrom() & validateText();

        if(valid) {
          alerts.hide();
        } else {
          alerts.showError(messages.invalid_form);
        }

        return valid;
      },

      successCallback = function() {
        alerts.showSuccess(messages.send_success);
      },

      failureCallback = function() {
        alerts.showError(messages.send_error);
      },

      send = function() {
        if(validate()) {
          alerts.showInfo(messages.send_pending);
          form.send(
            {
              subject: domComponents.subject.val(),
              from: domComponents.from.val(),
              text: domComponents.text.val()
            },
            successCallback,
            failureCallback
          );
        }
      };

  form.divertKeyPress(domComponents.form, send);
  domComponents.from.on('change', validateFrom);
  domComponents.text.on('change', validateText);
  domComponents.send.on('click', send);
})(this);
