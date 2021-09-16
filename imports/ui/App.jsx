import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { InvoicesCollection } from '../api/InvoicesCollection';
import { Invoice } from './Invoice'

// const invoices = [
//   {_id: 1, text: 'first invoice'},
//   {_id: 2, text: 'second invoice'},
//   {_id: 3, text: 'third invoice'},
// ];

export const App = () => {
  const invoices = useTracker(() => InvoicesCollection.find({}).fetch());

  return(
    <div>
      <h1>test Invoice Management</h1>
  
      <ul>
        { invoices.map(invoice => <Invoice key={invoice._id} invoice={ invoice }/>) }
      </ul>
  
    </div>
  );
}



