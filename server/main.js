import { Meteor } from 'meteor/meteor';
import { InvoicesCollection } from '/imports/api/InvoicesCollection';

const insertInvoice = invoiceText => InvoicesCollection.insert({text: invoiceText});

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (InvoicesCollection.find().count() === 0) {
    [
      'invoice new',
      'invoice 2',
      'invoice 3'
    ].forEach(insertInvoice)
  }
});
