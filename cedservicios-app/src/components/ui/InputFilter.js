import React from 'react';
import { Form } from 'react-bootstrap';

export const InputFilter = ({ id, filterText, onFilter, placeholder = 'Buscar...' }) => {
    return (
        <div style={{ width: '33%' }}>
            <Form.Control
                id={id}
                type="text"
                placeholder={placeholder}
                value={filterText}
                onChange={onFilter} />
        </div>
    )
}
