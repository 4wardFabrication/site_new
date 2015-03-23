describe('Alerts', function() {
  var alerts, element;

  beforeEach(function() {
    element = $('<div id="alerts"><div role="alert" class="alert alert-success"><span></span></div><div role="alert" class="alert alert-info"><span></span></div><div role="alert" class="alert alert-danger"><span></span></div></div>');
    alerts = new Alerts(element);
  });

  describe('#showSuccess', function(){
    beforeEach(function() {
        alerts.showSuccess('success message');
    });

    it('success message is shown', function() {
      expect(element).toEqual($('<div id="alerts"><div role="alert" class="alert alert-success" style="display: block; "><span>success message</span></div><div role="alert" class="alert alert-info" style="display: none; "><span></span></div><div role="alert" class="alert alert-danger" style="display: none; "><span></span></div></div>'));
    });

  });

});
