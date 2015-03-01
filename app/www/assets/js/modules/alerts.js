function Alerts(element) {
  this.element = element;
  this.success = this.element.find('.alert-success');
  this.info = this.element.find('.alert-info');
  this.error = this.element.find('.alert-danger');
};

Alerts.prototype.showSuccess = function(message) {
  this.success.find('span').html(message);
  this.hide();
  this.success.css('display', 'block');
};

Alerts.prototype.showError = function(message) {
  this.error.find('span').html(message);
  this.hide();
  this.error.css('display', 'block');
};

Alerts.prototype.showInfo = function(message) {
  this.info.find('span').html(message);
  this.hide();
  this.info.css('display', 'block');
};

Alerts.prototype.hide = function() {
  this.success.css('display', 'none');
  this.info.css('display', 'none');
  this.error.css('display', 'none');
};
