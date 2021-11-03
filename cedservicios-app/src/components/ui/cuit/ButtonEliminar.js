import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { iniciarSetCuitActivo } from '../../../actions/cuit';
import { openModal } from '../../../actions/ui';

const nameModal = 'modalCuit';
const typeModal = 'Eliminar';

export const ButtonEliminar = ({ cuit }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {

        dispatch(iniciarSetCuitActivo(cuit));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button variant="danger" size="sm" onClick={handleOnClick}>
            <i className="fas fa-trash"></i>
        </Button>
    )
}
