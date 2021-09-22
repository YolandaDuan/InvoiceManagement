import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { InvoicesCollection } from '/imports/db/InvoicesCollection';
import '/imports/api/invoicesMethods';

if (Meteor.isServer) {
  describe('Invoices', () => {
    describe('methods', () => {
      const userId = Random.id();
      let invoiceId;

      beforeEach(() => {
        InvoicesCollection.remove({});
        invoiceId = InvoicesCollection.insert({
          text: 'Test invoice',
          createdAt: new Date(),
          userId,
        });
      });

      it('can delete owned invoice', () => {
        mockMethodCall('invoices.remove', invoiceId, { context: { userId } });

        assert.equal(InvoicesCollection.find().count(), 0);
      });

      it(`can't delete invoice without an user authenticated`, () => {
        const fn = () => mockMethodCall('invoices.remove', invoiceId);
        assert.throw(fn, /Not authorized/);
        assert.equal(InvoicesCollection.find().count(), 1);
      });


      it('can\'t delete invoice from another owner', () => {
        const fn = () =>
          mockMethodCall('invoices.remove', invoiceId, {
            context: { userId: 'somebody-else-id' },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(InvoicesCollection.find().count(), 1);
      });

      it('can change the status of a invoice', () => {
        const originalInvoice = InvoicesCollection.findOne(invoiceId);
        mockMethodCall('invoices.setIsPaid', invoiceId, !originalInvoice.isPaid, {
          context: { userId },
        });

        const updatedInvoice = InvoicesCollection.findOne(invoiceId);
        assert.notEqual(updatedInvoice.isPaid, originalInvoice.isPaid);
      });


      it('can insert new invoices', () => {
        const text = 'New Invoice';
        mockMethodCall('invoices.insert', text, {
        context: { userId },
        });

        const invoices = InvoicesCollection.find({}).fetch();
        assert.equal(invoices.length, 2);
        assert.isTrue(invoices.some(invoice => invoice.text === text));
        });
    });
  });
}