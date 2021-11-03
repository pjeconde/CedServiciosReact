import React from 'react';
import { Button } from 'react-bootstrap';

export const ButtonAgregar = ({ handleOnClick }) => {
    return (
        <Button type="button" variant="secondary" onClick={handleOnClick}>
            <i className="fas fa-plus"></i>
            Agregar
        </Button>
    )
}
