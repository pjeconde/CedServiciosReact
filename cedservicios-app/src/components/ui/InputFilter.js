import React from 'react';
import { Form } from 'react-bootstrap';

export const InputFilter = ({
    id,
    filterText,
    onFilter,
    placeholder = 'Buscar...',
    ...rest }) => {
    return (
        <div style={{ width: '33%' }}>
            <Form.Control
                id={id}
                {...rest}
                type="text"
                autoComplete='off'
                placeholder={placeholder}
                value={filterText}
                onChange={onFilter} />
        </div>
    )
}
