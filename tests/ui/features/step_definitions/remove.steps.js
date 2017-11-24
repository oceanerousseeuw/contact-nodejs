const {Given, Then, When} = require('cucumber');
const assert = require('assert');
let lengthOfList;

Given(/The contact list is display/, function (callback) {
    this.browser.visit("http://127.0.0.1:3000/", (err) =>{

        if(err) throw err;

        let myChild = this.browser.queryAll('th');
        const header = ["First name", "Last name", "Phones", "Mails", "Tags", "Actions"];
        for(let i=0; i< header.length; i++){
            assert.equal(myChild[i].innerHTML, header[i]);
        }

        const firstName = ["Eric", "Pierre", "Jean", "Jacques"];
        const lastName = ["RAMAT","DUPONT", "DUPOND", "DURAND"];
        let j = 0;
        let c = this.browser.tabs.current.Contact;
        let iterator = c.Contacts.instance().iterator();
        while(iterator.hasNext()){
            let contact = iterator.next();
            assert.equal(contact.firstName(), firstName[j]);
            assert.equal(contact.lastName(), lastName[j]);
            j++;
        }


        iterator = c.Contacts.instance().iterator();
        let contact = iterator.next();
        let firstContact = this.browser.querySelectorAll('tr')[1].querySelectorAll('td');
        assert.equal(contact.firstName(), firstContact[0].innerHTML);
        assert.equal(contact.lastName(), firstContact[1].innerHTML);

        let i, tel = '';
        for (i = 0; i < contact.phones().length; ++i) {
            let phone = contact.phones()[i];

            tel += phone.number();
            if (phone.category() === c.PhoneCategory.PRO) {
                tel += '[PRO]';
            } else {
                tel += '[PERSO]';
            }
            if (phone.type() === c.PhoneType.MOBILE) {
                tel += '[MOBILE]';
            } else if (phone.type() === c.PhoneType.FAX) {
                tel += '[FAX]';
            } else {
                tel += '[PHONE]';
            }
            if (i < contact.phones().length - 1) {
                tel += '/';
            }
        }
        assert.equal(tel, firstContact[2].innerHTML);
        let k, adrmail = '';

        for (k = 0; k < contact.mails().length; ++k) {
            let mail = contact.mails()[k];

            adrmail += mail.address();
            if (mail.category() === c.MailCategory.PRO) {
                adrmail += '[PRO]';
            } else {
                adrmail += '[PERSO]';
            }
            if (k < contact.phones().length - 1) {
                adrmail += '/';
            }
        }
        assert.equal(adrmail, firstContact[3].innerHTML);

        assert.equal(contact.tags(), firstContact[4].innerHTML);
        callback();
    });
});

When(/User clicks on remove button of the first contact/, function(callback){
    this.browser.visit("http://127.0.0.1:3000/", (err) =>{
        if(err) throw err;
        lengthOfList = this.browser.tabs.current.Contact.Contacts.instance().size();
        let firstContact = this.browser.querySelectorAll('tr')[1].querySelector('a');
        firstContact.click();
        callback();
    });
});

Then(/The first contact is removed/, function (callback) {
    let newLengthOfList = this.browser.tabs.current.Contact.Contacts.instance().size();
    assert.equal(lengthOfList-1, newLengthOfList);
    callback();
});
