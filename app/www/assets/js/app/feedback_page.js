(function() {
  var alerts = new Alerts($('div#alerts')),
      form = new Form('/api/emailer'),
      contactForm = $('section#feedback-form'),
      domComponents = {
        form: contactForm.find('form'),
        subject: contactForm.find('input#subject'),
        from: contactForm.find('input#from'),
        name: contactForm.find('input#name'),
        ratings: {
          workmanship: contactForm.find('#ratings-workmanship'),
          communication: contactForm.find('#ratings-communication'),
          leadtime: contactForm.find('#ratings-leadtime'),
          punctuality: contactForm.find('#ratings-punctuality'),
          professionalism: contactForm.find('#ratings-professionalism'),
        },
        comments: contactForm.find('textarea#comments'),
        send: contactForm.find('button#send')
      },
      messages = {
        invalid_form: '<strong>Uh oh!</strong> We would greatly appreciate if you could please provide an email, your name, your ratings and some comments. Thank you!',
        send_pending: '<strong>Hold up!</strong> We are attempting to send your feedback.',
        send_success: '<strong>Got it!</strong> Thank you! Your feedback is greatly appreciated',
        send_error: '<strong>Well this is embarrassing!</strong> There was an issue sending your feedback. We apologise for any inconvenience.'
      },
      validations = {
        email: new RegExp('^[^@]+@[^@]+$'),
        text: new RegExp('.{5}'),
        name: new RegExp('.{2}')
      },

      validateFrom = function() {
        return form.validateField(domComponents.from, validations.email);
      },

      validateComments = function() {
        return form.validateField(domComponents.comments, validations.text);
      },

      validateName = function() {
        return form.validateField(domComponents.name, validations.name);
      },

      validateWorkmanship = function() {
        return form.validateRadio(domComponents.ratings.workmanship);
      },

      validateCommunication = function() {
        return form.validateRadio(domComponents.ratings.communication);
      },

      validateLeadTime = function() {
        return form.validateRadio(domComponents.ratings.leadtime);
      },

      validatePunctuality = function() {
        return form.validateRadio(domComponents.ratings.punctuality);
      },

      validateProfessionalism = function() {
        return form.validateRadio(domComponents.ratings.professionalism);
      },

      validate = function() {
        var valid = validateFrom() &
                    validateComments() &
                    validateName() &
                    validateWorkmanship() &
                    validateCommunication() &
                    validateLeadTime() &
                    validatePunctuality() &
                    validateProfessionalism();

        if(valid) {
          alerts.hide();
        } else {
          alerts.showError(messages.invalid_form);
        }

        return valid;
      },

      generateText = function() {
        return [
          'Name: ' + domComponents.name.val(),
          'Workmanship: ' + domComponents.ratings.workmanship.find('input:checked').val(),
          'Communication: ' + domComponents.ratings.communication.find('input:checked').val(),
          'Lead time: ' + domComponents.ratings.leadtime.find('input:checked').val(),
          'Punctuality: ' + domComponents.ratings.punctuality.find('input:checked').val(),
          'Professionalism: ' + domComponents.ratings.professionalism.find('input:checked').val(),
          'Comments: ' + domComponents.comments.val()
        ].join('\n');
      },

      successCallback = function() {
        alerts.showSuccess(messages.send_success);
        domComponents.form.trigger('reset');
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
              text: generateText()
            },
            successCallback,
            failureCallback
          );
        }
      };

  form.divertKeyPress(domComponents.form, send);
  domComponents.from.on('change', validateFrom);
  domComponents.comments.on('change', validateComments);
  domComponents.name.on('change', validateName);
  domComponents.ratings.workmanship.on('change', validateWorkmanship);
  domComponents.ratings.communication.on('change', validateCommunication);
  domComponents.ratings.leadtime.on('change', validateLeadTime);
  domComponents.ratings.punctuality.on('change', validatePunctuality);
  domComponents.ratings.professionalism.on('change', validateProfessionalism);
  domComponents.send.on('click', send);
})(this);
