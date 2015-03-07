(function() {
    this.ContactForm.call({}, $('section#contactform'), "/api/emailer", new Alerts($('div#alerts')));
})(this);
