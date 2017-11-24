var Contact = Contact || {};

Contact = (function (self) {
    'use strict';

    self.Request = function (c) {
        var contact;

        this.contact = function () {
            return contact;
        };

        this.tag = function () {
            return contact.tags()[0];
        };

        var init = function (c) {
            contact = c;
        };

        init(c);
    };

    self.Chain = function (f) {
        var first;

        this.processRequest = function (r) {
            var current = first;

            while (current) {
                if (current.canRequest(r)) {
                    current.process(r);
                    break;
                } else {
                    current = current.next();
                }
            }
        };

        var init = function (f) {
            first = f;
        };

        init(f);
    };

    self.Handler = function (c, n) {
        var contacts;
        var next;

        this.canRequest = function (request) {
            return contacts.size() === 0 || contacts.existsTag(request.tag());
        };

        this.process = function (request) {
            contacts.add(request.contact());
        };

        this.next = function () {
            return next;
        };

        var init = function(c, n) {
            contacts = c;
            next = n;
        };

        init(c, n);
    };

    return self;

}(Contact || {}));