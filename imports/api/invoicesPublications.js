import { Meteor } from "meteor/meteor";
import { InvoicesCollection } from "../db/InvoicesCollection";

Meteor.publish('invoices', function publishInvoices() {
    return InvoicesCollection.find({ userId: this.userId });
});