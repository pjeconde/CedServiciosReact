import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { openModal } from '../../../actions/ui';
import { iniciarSetCuitActivo } from '../../../actions/cuit';

const nameModal = 'modalCuit';
const typeModal = 'Detalle';

export const ButtonDetalle = ({ cuit }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(iniciarSetCuitActivo(cuit));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button variant="info" size="sm" onClick={handleOnClick}>
            <i className="fas fa-search-plus"></i>
        </Button>
    )
}
