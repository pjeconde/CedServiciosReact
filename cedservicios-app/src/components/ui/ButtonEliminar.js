import React from 'react';
import { Button } from 'react-bootstrap';

export const ButtonEliminar = ({ row, handleOnClick, disabled = false }) => {
    return (
        <Button
            variant="danger"
            size="sm"
            onClick={() => handleOnClick(row)}
            disabled={disabled}>
            <i className="fas fa-trash"></i>
        </Button>
    )
}
