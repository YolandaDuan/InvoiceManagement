import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const InvoiceForm = ({ user }) => {
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) return;

        Meteor.call('invoices.insert', text);

        setText("");
    };

    return (
        <form className="invoice-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="add new invoices"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">
                Add Invoice
            </button>
        </form>
    );
};