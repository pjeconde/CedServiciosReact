import React from 'react';
import { Button } from 'react-bootstrap';

export const ButtonEliminar = ({ row, handleOnClick }) => {
    return (
        <Button variant="danger" size="sm" onClick={() => handleOnClick(row)}>
            <i className="fas fa-trash"></i>
        </Button>
    )
}
