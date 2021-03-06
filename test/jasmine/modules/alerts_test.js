describe('Alerts', function() {
  var alerts, element;

  beforeEach(function() {
    element = $('<div id="alerts"><div role="alert" class="alert alert-success"><span></span></div><div role="alert" class="alert alert-info"><span></span></div><div role="alert" class="alert alert-danger"><span></span></div></div>');
    alerts = new Alerts(element);
  });

  it('success message is shown', function() {
    alerts.showSuccess('success message');
    expect(element).toEqual($('<div id="alerts"><div role="alert" class="alert alert-success" style="display: block; "><span>success message</span></div><div role="alert" class="alert alert-info" style="display: none; "><span></span></div><div role="alert" class="alert alert-danger" style="display: none; "><span></span></div></div>'));
  });

  it('Error message is shown', function() {
    alerts.showError('error message');
    expect(element).toEqual($('<div id="alerts"><div role="alert" class="alert alert-success" style="display: none; "><span></span></div><div role="alert" class="alert alert-info" style="display: none; "><span></span></div><div role="alert" class="alert alert-danger" style="display: block; "><span>error message</span></div></div>'));
  });

  it('Info message is shown', function() {
    alerts.showInfo('info message');
    expect(element).toEqual($('<div id="alerts"><div role="alert" class="alert alert-success" style="display: none; "><span></span></div><div role="alert" class="alert alert-info" style="display: block; "><span>info message</span></div><div role="alert" class="alert alert-danger" style="display: none; "><span></span></div></div>'));
  });

  it('All alerts are hidden', function() {
    alerts.hide();
    expect(element).toEqual($('<div id="alerts"><div role="alert" class="alert alert-success" style="display: none; "><span></span></div><div role="alert" class="alert alert-info" style="display: none; "><span></span></div><div role="alert" class="alert alert-danger" style="display: none; "><span></span></div></div>'));
  });
});
