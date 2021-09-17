import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { InvoicesCollection } from '../api/InvoicesCollection';
import { Invoice } from './Invoice'
import { InvoiceForm } from './InvoiceForm';

const togglePaid = ({ _id, isPaid }) => {
  InvoicesCollection.update(_id, {
    $set: {
      isPaid: !isPaid
    }
  })
};

const deleteInvoice = ({ _id }) => InvoicesCollection.remove(_id);

export const App = () => {
  const hidePaidFilter = { isPaid : { $ne: true }};
  const [hidePaid, setHidePaid] = useState(false);

  const invoices = useTracker(() => 
    InvoicesCollection.find(hidePaid ? hidePaidFilter : {}, { 
      sort: { createdAt: -1 }, 
    }).fetch()
  );
 

  const pendingInvoicesCount = useTracker(() =>
    InvoicesCollection.find(hidePaidFilter).count()
  );

  const pendingInvoicesTitle = `${
    pendingInvoicesCount ? ` (${pendingInvoicesCount})`: ''
  }`;

  return(
    <div className="app">
      <heaeder>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              Invoice Management 
              {pendingInvoicesTitle}
            </h1>
          </div>
        </div>
      </heaeder>
     
      <div className="main">
        <InvoiceForm/>
        <div className="filter">
          <button onClick={() => setHidePaid(!hidePaid)}>
            {hidePaid ? 'Show All' : 'Hide Paid'}
          </button>
        </div>

        <ul className="invoices">
          { invoices.map(invoice => <Invoice 
          key={invoice._id} 
          invoice={ invoice } 
          onCheckboxClick={togglePaid}
          onDeleteClick={deleteInvoice}  
          />) }
        </ul>
      </div>  
    </div>
  );
}



