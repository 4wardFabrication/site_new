function Form(url) {
  this.url = url;
  this.formatAsValid = function(field) {
    field.removeClass('has-error');
  };
  this.formatAsInValid = function(field) {
    field.addClass('has-error');
  };
}

Form.prototype.validateField = function(field, regex) {
  var valid = regex.test(field.val());
  if(valid) {
    this.formatAsValid(field);
  } else {
    this.formatAsInValid(field);
  }
  return valid;
};

Form.prototype.validateRadio = function(parent) {
  var valid = typeof(parent.find('input:checked').val()) !== 'undefined';
  if(valid) {
    this.formatAsValid(parent);
  } else {
    this.formatAsInValid(parent);
  }
  return valid;
};

Form.prototype.send = function(data, success, failure) {
  $.post(this.url, data, success).fail(failure);
};

Form.prototype.divertKeyPress = function(form, callback) {
  form.submit(function() {
    callback();
    return false;
  });
};
