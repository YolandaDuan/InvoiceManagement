import React from 'react';

export const Invoice = ({ invoice, onCheckboxClick, onDeleteClick }) => {
    return (
    <li>
        <input
            type="checkbox"
            checked={!!invoice.isChecked}
            onClick={() => onCheckboxClick(invoice)}
            readOnly
        />
        <span>{invoice.text}</span>
        <button onClick={ () => onDeleteClick(invoice) }>&times;</button>
    </li>
    );
};