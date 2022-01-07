import React from 'react';
import { Button } from 'react-bootstrap';

export const ButtonSolicitar = ({ row, handleOnClick }) => {
    return (
        <Button type="button" variant='secondary' onClick={() => handleOnClick(row)}>
            Solicitar
        </Button>
    )
}
