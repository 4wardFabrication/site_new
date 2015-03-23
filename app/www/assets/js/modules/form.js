function Form(url) {
  this.url = url;
  this.formatAsValid = function(field) {
    field.removeClass('has-error');
  };
  this.formatAsInValid = function(field) {
    field.addClass('has-error');
  };
};

Form.prototype.validateField = function(field, regex) {
  var valid = regex.test(field.val());
  valid ? this.formatAsValid(field) : this.formatAsInValid(field);
  return valid;
};

Form.prototype.send = function(data, success, failure) {
  $.post(this.url, data, success).fail(failure);
};
