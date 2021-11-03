import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { openModal } from '../../../actions/ui';
import { iniciarSetCuitActivo } from '../../../actions/cuit';

const nameModal = 'modalCuit';
const typeModal = 'Actualizar';

export const ButtonActualizar = ({ cuit }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(iniciarSetCuitActivo(cuit));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button variant="secondary" size="sm" onClick={handleOnClick}>
            <i className="fas fa-edit"></i>
        </Button>
    )
}
