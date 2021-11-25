import React from 'react';
import { Button } from 'react-bootstrap';

export const ButtonActualizar = ({ row, handleOnClick, disabled = false }) => {
    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={() => handleOnClick(row)}
            disabled={disabled}>
            <i className="fas fa-edit"></i>
        </Button>
    )
}
