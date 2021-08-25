import React from 'react';
import { Form } from 'react-bootstrap';

export const InputFilter = ({ id, filterText, onFilter }) => {
    return (
        <div style={{ width: '33%' }}>
            <Form.Control
                id={id}
                type="text"
                placeholder="Buscar..."
                value={filterText}
                onChange={onFilter} />
        </div>
    )
}
