import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { InvoicesCollection } from '../db/InvoicesCollection';
import { Invoice } from './Invoice'
import { InvoiceForm } from './InvoiceForm';
import { LoginForm } from './LoginForm';

const togglePaid = ({ _id, isPaid }) => {
  Meteor.call('invoices.setIsPaid', _id, !isPaid)
};

const deleteInvoice = ({ _id }) => Meteor.call('invoices.remove', _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();
  
  const hidePaidFilter = { isPaid : { $ne: true }};
  const [hidePaid, setHidePaid] = useState(false);

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hidePaidFilter, ...userFilter };

  const invoices = useTracker(() => {
    if(!user) {
      return [];
    }

    return InvoicesCollection.find(
      hidePaid ? pendingOnlyFilter : userFilter, 
      { 
      sort: { createdAt: -1 }, 
      }
    ).fetch();
  });
 
  const pendingInvoicesCount = useTracker(() => {
    if (!user) {
      return 0;
    }
  
    return InvoicesCollection.find(pendingOnlyFilter).count();
  });

  const pendingInvoicesTitle = `${
    pendingInvoicesCount ? ` (${pendingInvoicesCount})`: ''
  }`;

  return(
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              Invoice Management 
              {pendingInvoicesTitle}
            </h1>
          </div>
        </div>
      </header>
     
      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 👸
            </div>
            <InvoiceForm/>
            
            <div className="filter">
              <button onClick={() => setHidePaid(!hidePaid)}>
                {hidePaid ? 'Show All' : 'Hide Paid'}
              </button>
            </div>

            <ul className="invoices">
              {invoices.map(invoice => (
                <Invoice 
                  key={invoice._id} 
                  invoice={ invoice } 
                  onCheckboxClick={togglePaid}
                  onDeleteClick={deleteInvoice}  
              />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>  
    </div>
  );
}



