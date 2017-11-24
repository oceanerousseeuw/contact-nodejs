var Contact = Contact || {};

Contact = (function (self) {
  'use strict';

  self.Iterator = function (i) {
    var index = 0,
      items = i,
      keys = Array.isArray(i) ? Array(i.length).fill().map((_, idx) => idx) : Object.keys(i);

    this.first = function () {
      this.reset();
      return this.next();
    };

    this.next = function () {
      return items[keys[index++]];
    };

    this.hasNext = function () {
      return index < keys.length;
    };

    this.reset = function () {
      index = 0;
    };

    this.each = function (callback) {
      var item;

      for (item = this.first(); this.hasNext(); item = this.next()) {
        callback(item);
      }
    };
  };

  return self;

}(Contact || {}));