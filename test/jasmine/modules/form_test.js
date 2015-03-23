describe('Form', function() {
  var form;

  beforeEach(function() {
    form = new Form();
  });

  describe('#validateField', function() {
    var field, valid;

    describe('regex is valid', function() {
      beforeEach(function() {
        field = $('<input class="has-error" type="email" value="123">');
        var regex = new RegExp('123');
        valid = form.validateField(field, regex)
      });

      it('returns true', function() {
        expect(valid).toBe(true);
      });

      it('error class has been removed', function() {
        expect(field).toEqual($('<input class="" type="email" value="123">'));
      });
    });

    describe('regex is invalid', function() {
      beforeEach(function() {
        field = $('<input type="email" value="123">');
        var regex = new RegExp('abc');
        valid = form.validateField(field, regex)
      });

      it('returns false', function() {
        expect(valid).toBe(false);
      });

      it('error class has been added', function() {
        expect(field).toEqual($('<input class="has-error" type="email" value="123">'));
      });
    });
  });

});
