var Contact = Contact || {};

Contact = (function (self) {
  'use strict';

  var contactsInstance;

  self.Contacts = function () {
    var list = {};

    this.add = function (contact) {
      list[contact.id()] = contact;
    };

    this.change = function (strategy) {
      strategy.change(list);
    };

    this.clear = function () {
      var key;

      for (key in list) {
        delete list[key];
      }
    };

    this.get = function (id) {
      return list[id];
    };

    this.getFromName = function (f, l) {
      var r = [], key;

      for (key in list) {
        if (list.hasOwnProperty(key) &&
          list[key].firstName() === f &&
          list[key].lastName() === l) {
          r.push(list[key]);
        }
      }
      if (r.length === 0) {
        return null;
      }
      if (r.length === 1) {
        return r[0];
      }
      return r;
    };

    this.iterator = function (l) {
      return new Contact.Iterator(l ? l : list);
    };

    this.remove = function (id) {
      delete list[id];
    };

    this.search = function (strategy) {
      return strategy.search(list);
    };

    this.save = function () {
      Contact.Storage.instance().save(this);
    };

    this.size = function () {
      var size = 0, key;

      for (key in list) {
        if (list.hasOwnProperty(key)) {
          ++size;
        }
      }
      return size;
    };

    this.sort = function () {
      var sorted_list = [];

      for (var key in list) {
        if (list.hasOwnProperty(key)) {
          sorted_list.push(list[key]);
        }
      }
      sorted_list.sort(function (a, b) {
        return (a.lastName() > b.lastName()) ? 1 : ((b.lastName() > a.lastName()) ? -1 : 0);
      });
      return sorted_list;
    };
  };

  self.Contacts.instance = function () {
    if (!contactsInstance) {
      contactsInstance = new self.Contacts();
    }
    return contactsInstance;
  };

  return self;

}(Contact || {}));