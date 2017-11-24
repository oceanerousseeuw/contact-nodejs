var Contact = Contact || {};

Contact = (function (self) {
    'use strict';

    self.View = function (m) {
        var model = m;

        this.update = function (list) {
            $('#contacts').empty();
            init(list);
        };

        var buildHeader = function (table) {
            var line = $('<tr />');

            $('<th />', {id: 'cellFirstName', html: 'First name'}).appendTo(line);
            $('<th />', {id: 'cellLastName', html: 'Last name'}).appendTo(line);
            $('<th />', {id: 'cellPhones', html: 'Phones'}).appendTo(line);
            $('<th />', {id: 'cellMails', html: 'Mails'}).appendTo(line);
            $('<th />', {id: 'cellTags', html: 'Tags'}).appendTo(line);
            $('<th />', {id: 'cellActions', html: 'Actions'}).appendTo(line);
            line.appendTo(table);
        };

        var buildPhones = function (contact, line) {
            var i, text = '';

            for (i = 0; i < contact.phones().length; ++i) {
                var phone = contact.phones()[i];

                text += phone.number();
                if (phone.category() === Contact.PhoneCategory.PRO) {
                    text += '[PRO]';
                } else {
                    text += '[PERSO]';
                }
                if (phone.type() === Contact.PhoneType.MOBILE) {
                    text += '[MOBILE]';
                } else if (phone.type() === Contact.PhoneType.FAX) {
                    text += '[FAX]';
                } else {
                    text += '[PHONE]';
                }
                if (i < contact.phones().length - 1) {
                    text += '/';
                }
            }
            $('<td />', {id: 'cellPhones', html: text}).appendTo(line);
        };

        var buildMails = function (contact, line) {
            var i, text = '';

            for (i = 0; i < contact.mails().length; ++i) {
                var mail = contact.mails()[i];

                text += mail.address();
                if (mail.category() === Contact.MailCategory.PRO) {
                    text += '[PRO]';
                } else {
                    text += '[PERSO]';
                }
                if (i < contact.phones().length - 1) {
                    text += '/';
                }
            }
            $('<td />', {id: 'cellMails', html: text}).appendTo(line);
        };

        var buildTags = function (contact, line) {
            var i, text = '';

            for (i = 0; i < contact.tags().length; ++i) {
                text += contact.tags()[i];
                if (i < contact.tags().length - 1) {
                    text += '/';
                }
            }
            $('<td />', {id: 'cellTags', html: text}).appendTo(line);
        };

        var init = function (list) {
            var it = model.iterator(list);
            var table = $('<table />');

            buildHeader(table);
            while (it.hasNext()) {
                var contact = it.next();

                if (contact) {
                    var line = $('<tr />', {id: 'x' + contact.id()});
                    var cellFirstName = $('<td />',
                        {id: 'cellFirstName', html: contact.firstName()});
                    var cellLastName = $('<td />',
                        {id: 'cellLastName', html: contact.lastName()});

                    cellFirstName.appendTo(line);
                    cellLastName.appendTo(line);
                    buildPhones(contact, line);
                    buildMails(contact, line);
                    buildTags(contact, line);
                    $('<td />',
                        {
                            html: '<a id="button_' + contact.id() + '" class="btn btn-danger btn-block active">Delete</a>'
                        }).appendTo(line);
                    line.appendTo(table);
                }
            }
            table.appendTo($('#contacts'));
            $('<td />',
              {
                  html: '<a id="button_sort" class="btn btn-warning btn-block active">Sort</a>'
              }).appendTo($('#contacts'));
        };

        init();
    };

    return self;

}(Contact || {}));
