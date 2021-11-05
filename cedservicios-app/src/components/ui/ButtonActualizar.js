import React from 'react';
import { Button } from 'react-bootstrap';

export const ButtonActualizar = ({ row, handleOnClick }) => {
    return (
        <Button variant="secondary" size="sm" onClick={() => handleOnClick(row)}>
            <i className="fas fa-edit"></i>
        </Button>
    )
}
