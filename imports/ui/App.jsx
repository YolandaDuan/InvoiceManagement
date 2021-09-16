import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { InvoicesCollection } from '../api/InvoicesCollection';
import { Invoice } from './Invoice'
import { InvoiceForm } from './InvoiceForm';

export const App = () => {
  const invoices = useTracker(() => InvoicesCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return(
    <div>
      <h1>Invoice Management</h1>
  
      <InvoiceForm/>

      <ul>
        { invoices.map(invoice => <Invoice key={invoice._id} invoice={ invoice }/>) }
      </ul>
  
    </div>
  );
}



