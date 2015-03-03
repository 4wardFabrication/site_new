(function() {
    this.QuoteForm.call({}, $('section#quoteform'), "/api/emailer", new Alerts($('div#alerts')));
})(this);
