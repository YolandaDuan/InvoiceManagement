import { check } from 'meteor/check';
import { InvoicesCollection } from '../db/InvoicesCollection';

Meteor.methods({
    'invoices.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        InvoicesCollection.insert({
            text,
            createdAt: new Date,
            userId: this.userId,
        })
    },

    'invoices.remove'(invoiceId) {
        check(invoiceId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const invoice = InvoicesCollection.findOne({ _id: invoiceId, userId: this.userId });

        if (!invoice) {
            throw new Meteor.Error('Access denied.');
        }

        InvoicesCollection.remove(invoiceId);
    },

    'invoices.setIsPaid'(invoiceId, isPaid) {
        check(invoiceId, String);
        check(isPaid, Boolean)

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const invoice = InvoicesCollection.findOne({ _id: invoiceId, userId: this.userId });

        if (!invoice) {
            throw new Meteor.Error('Access denied.');
        }

        InvoicesCollection.update(invoiceId, {
            $set: {
                isPaid,
            }
        });
    }
});