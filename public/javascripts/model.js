var Contact = Contact || {};

Contact = (function (self) {
  'use strict';

  self.Model = function () {
    this.iterator = function (i) {
      return Contact.Contacts.instance().iterator(i);
    };

    this.remove = function (id) {
      Contact.Contacts.instance().remove(id);
    };

    this.sort = function () {
      return Contact.Contacts.instance().sort();
    };
  };

  return self;

}(Contact || {}));