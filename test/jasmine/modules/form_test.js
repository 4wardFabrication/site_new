describe('Form', function() {
  var form;

  beforeEach(function() {
    form = new Form('http://api.example.com');
  });

  describe('#divertKeyPress', function() {
    it('attaches callback to submit action', function() {
      var formElement = $('<form></form>'),
          callback = jasmine.createSpy("callback");
      form.divertKeyPress(formElement, callback);
      formElement.submit();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('#send', function() {
    beforeEach(function() {
      jasmine.Ajax.install();
    });

    it('posts to url', function() {
      form.send({}, null, null);
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://api.example.com');
    });

    it('sends data', function() {
      form.send({email: 'test@email.com'}, null, null);
      expect(JSON.stringify(jasmine.Ajax.requests.mostRecent().data())).toEqual('{"email":["test@email.com"]}');
    });

    it('calls success', function() {
      var success = jasmine.createSpy("success"),
          failure = jasmine.createSpy("failure");
      form.send({email: 'test@email.com'}, success, failure);
      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": 'text/plain',
        "responseText": 'response text'
      });
     expect(success).toHaveBeenCalled();
     expect(failure).not.toHaveBeenCalled();
    });

    it('calls failure', function() {
      var success = jasmine.createSpy("success"),
          failure = jasmine.createSpy("failure");
      form.send({email: 'test@email.com'}, success, failure);
      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 500,
        "contentType": 'text/plain',
        "responseText": 'failure'
      });
     expect(success).not.toHaveBeenCalled();
     expect(failure).toHaveBeenCalled();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });
  });

  describe('#validateField', function() {
    var field, valid;

    describe('regex is valid', function() {
      beforeEach(function() {
        field = $('<input class="has-error" type="email" value="123">');
        var regex = new RegExp('123');
        valid = form.validateField(field, regex);
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
        valid = form.validateField(field, regex);
      });

      it('returns false', function() {
        expect(valid).toBe(false);
      });

      it('error class has been added', function() {
        expect(field).toEqual($('<input class="has-error" type="email" value="123">'));
      });
    });
  });

  describe('#validateRadio', function() {
    var field, valid;

    describe('checked', function() {
      beforeEach(function() {
        field = $('<div id="rating" class="has-error" ><input type="radio" name="rating" value="123"></div>');
        field.find('input').prop('checked', true);
        valid = form.validateRadio(field);
      });

      it('returns true', function() {
        expect(valid).toBe(true);
      });

      it('error class has been removed', function() {
        expect(field).toEqual($('<div id="rating" class=""><input type="radio" name="rating" value="123"></div>'));
      });
    });

    describe('unchecked', function() {
      beforeEach(function() {
        field = $('<div id="rating"><input type="radio" name="rating" value="123"></div>');
        valid = form.validateRadio(field);
      });

      it('returns false', function() {
        expect(valid).toBe(false);
      });

      it('error class has been added', function() {
        expect(field).toEqual($('<div id="rating" class="has-error"><input type="radio" name="rating" value="123"></div>'));
      });
    });
  });
});
