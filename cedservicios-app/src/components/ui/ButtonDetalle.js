import React from 'react';
import { Button } from 'react-bootstrap';

export const ButtonDetalle = ({ row, handleOnClick }) => {
    return (
        <Button variant="info" size="sm" onClick={() => handleOnClick(row)}>
            <i className="fas fa-search-plus"></i>
        </Button>
    )
}
