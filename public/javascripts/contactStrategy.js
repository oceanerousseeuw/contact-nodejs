var Contact = Contact || {};

Contact = (function (self) {
    'use strict';

    self.FromNameSearchStrategy = function (f, l) {
        this.search = function (list) {
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
    };

    self.FromMailSearchStrategy = function (m) {
        var searchMail = function (mails) {
            var index = 0,
                found = false;

            while (index < mails.length && !found) {
                if (mails[index].address() === m) {
                    found = true;
                } else {
                    ++index;
                }
            }
            if (found) {
                return mails[index];
            }
            return null;
        };

        this.search = function (list) {
            var r = [], key;

            for (key in list) {
                if (list.hasOwnProperty(key) &&
                    searchMail(list[key].mails())) {
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
    };

    self.FromPhoneSearchStrategy = function (m) {
        var key = m;

        var searchPhone = function (phones) {
            var index = 0,
                found = false;

            while (index < phones.length && !found) {
                if (phones[index].number() === m) {
                    found = true;
                } else {
                    ++index;
                }
            }
            if (found) {
                return phones[index];
            }
            return null;
        };

        this.key = function () {
            return key;
        };

        this.search = function (list) {
            var r = [], key;

            for (key in list) {
                if (list.hasOwnProperty(key) &&
                    searchPhone(list[key].phones())) {
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
    };

    self.ChangePhoneStrategy = function (f, l, o, n) {
        this.change = function (list) {
            var r = [], key;

            for (key in list) {
                if (list.hasOwnProperty(key) &&
                    list[key].firstName() === f &&
                    list[key].lastName() === l) {
                    r.push(list[key]);
                }
            }
            if (r.length === 1) {
                r[0].replacePhone(o, n);
            }
        };
    };

    return self;

}(Contact || {}));