import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Invoice } from './Invoice'
import { InvoiceForm } from './InvoiceForm';
import { LoginForm } from './LoginForm';
import { invoicesRepository } from '../api/InvoicesRepository';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();
  
  const [hidePaid, setHidePaid] = useState(false);

  const invoices = useTracker(() => {
    if(!user) {
      return [];
    }

    return invoicesRepository.findAll(user, hidePaid);
  });
 
  const pendingInvoicesCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    return invoicesRepository.pendingCount(user)
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
            <InvoiceForm user={user}/>
            
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
                  onCheckboxClick={invoicesRepository.togglePaid}
                  onDeleteClick={invoicesRepository.deleteInvoice}  
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



