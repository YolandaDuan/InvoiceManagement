import React, { useState } from 'react';
import { InvoicesCollection } from '../api/InvoicesCollection';

export const InvoiceForm = ({ user }) => {
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) return;

        InvoicesCollection.insert({
            text: text.trim(),
            createdAt: new Date(),
            userId: user._id
        });

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