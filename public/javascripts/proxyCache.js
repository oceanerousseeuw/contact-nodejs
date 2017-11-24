var Contact = Contact || {};

Contact = (function (self) {
    'use strict';

    self.ProxyCache = function (l) {
        var list,
            cachePhone = {};

        var save = function (self, strategy, key, contact) {
            if (strategy instanceof Contact.FromPhoneSearchStrategy) {
                cachePhone[strategy.key()] = {
                    key: key,
                    id: contact.id()
                };
                contact.addObserver(self);
            }
        };

        this.notify = function (contact) {
            for (var key in cachePhone) {
                if (cachePhone.hasOwnProperty(key)) {
                    if (cachePhone[key].id === contact.id()) {
                        delete cachePhone[key];
                        return;
                    }
                }
            }
        };

        this.search = function (strategy) {
            var key, cache, contact = null;

            if (this.inCache(strategy)) {
                if (strategy instanceof Contact.FromPhoneSearchStrategy) {
                    cache = cachePhone[strategy.key()];
                    return list[cache.key].get(cache.id);
                }
            } else {
                for (key in list) {
                    if (list.hasOwnProperty(key)) {
                        contact = list[key].search(strategy);
                        if (contact) {
                            save(this, strategy, key, contact);
                            return contact;
                        }
                    }
                }
            }
            return contact;
        };

        this.inCache = function (strategy) {
            if (strategy instanceof Contact.FromPhoneSearchStrategy) {
                return cachePhone.hasOwnProperty(strategy.key());
            }
            return false;
        };

        var init = function (l) {
            list = l;
        };

        init(l);
    };

    return self;

}(Contact || {}));