import { Mongo } from 'meteor/mongo';
var InvoicesCollection = new Mongo.Collection('invoices');

export class InvoicesRepository {
    togglePaid = ({ _id, isPaid }) => {
        InvoicesCollection.update(_id, {
          $set: {
            isPaid: !isPaid
          }
        })
      };

      getFilters(user) {
        const hidePaidFilter = { isPaid : { $ne: true }};
        const userFilter = user ? { userId: user._id } : {};
        const pendingOnlyFilter = { ...hidePaidFilter, ...userFilter };
        return { hidePaidFilter, userFilter, pendingOnlyFilter }
      }

      deleteInvoice = ({ _id }) => InvoicesCollection.remove(_id);

      findAll(user, hidePaid) {
        const { hidePaidFilter, userFilter } = this.getFilters(user);
        return InvoicesCollection.find(
            hidePaid ? hidePaidFilter : userFilter,
            { 
            sort: { createdAt: -1 }, 
            }
          ).fetch();
      }

      pendingCount(user) {
        const { pendingOnlyFilter } = this.getFilters(user);
        InvoicesCollection.find(pendingOnlyFilter).count();
      }

      insertInvoice(invoiceText, user) {
        InvoicesCollection.insert({
            text: invoiceText,
            userId: user._id,
            createAt: new Date(),
        });
      }

      invoicesCount() {
        return InvoicesCollection.find().count();
      }
}

export const invoicesRepository = new InvoicesRepository();

