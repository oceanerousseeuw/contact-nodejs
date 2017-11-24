var Contact = Contact || {};

Contact = (function (self) {
    'use strict';

    self.AddCommand = function () {
        var id;

        this.execute = function (contact) {
            Contact.Contacts.instance().add(contact);
            id = contact.id();
        };

        this.undo = function () {
            Contact.Contacts.instance().remove(id);
        };
    };

    self.RemoveCommand = function () {
        var contact;

        this.execute = function (id) {
            contact = Contact.Contacts.instance().get(id);

            Contact.Contacts.instance().remove(id);
        };

        this.undo = function () {
            Contact.Contacts.instance().add(contact);
        };
    };

    return self;

}(Contact || {}));