import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { InvoicesCollection } from '../api/InvoicesCollection';
import { Invoice } from './Invoice'
import { InvoiceForm } from './InvoiceForm';

const toggleChecked = ({ _id, isChecked }) => {
  InvoicesCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteInvoice = ({ _id }) => InvoicesCollection.remove(_id);

export const App = () => {
  const invoices = useTracker(() => InvoicesCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return(
    <div className="app">
      <heaeder>
        <div className="app-bar">
          <div className="app-header">
            <h1>Invoice Management</h1>
          </div>
        </div>
      </heaeder>
     
      <div className="main">
        <InvoiceForm/>

        <ul className="invoices">
          { invoices.map(invoice => <Invoice 
          key={invoice._id} 
          invoice={ invoice } 
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteInvoice}  
          />) }
        </ul>
      </div>  
    </div>
  );
}



