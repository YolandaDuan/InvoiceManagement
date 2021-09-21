import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { invoicesRepository } from '../imports/api/InvoicesRepository';

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
  if (invoicesRepository.invoicesCount() === 0) {
    [
      'invoice 1, init',
      'invoice 2',
      'invoice 3'
    ].forEach(invoiceText => invoicesRepository.insertInvoice(invoiceText, user));
  }
});
