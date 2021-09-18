import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { InvoicesCollection } from '/imports/api/InvoicesCollection';

const insertInvoice = (invoiceText, user) => 
  InvoicesCollection.insert({
    text: invoiceText,
    userId: user._id,
    createAt: new Date(),
  });

const SEED_USERNAME = 'yolanda';
const SEED_PASSWORD = 'duan';


Meteor.startup(() => {
  if(!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);
  
  // If the Links collection is empty, add some data.
  if (InvoicesCollection.find().count() === 0) {
    [
      'invoice 1, init',
      'invoice 2',
      'invoice 3'
    ].forEach(invoiceText => insertInvoice(invoiceText, user));
  }
});
