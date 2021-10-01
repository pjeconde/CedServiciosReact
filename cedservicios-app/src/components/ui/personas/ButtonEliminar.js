import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { iniciarSetPersonaActiva } from '../../../actions/persona';
import { openModal } from '../../../actions/ui';

const nameModal = 'modalEliminarPersona';
const typeModal = 'Eliminar';

export const ButtonEliminar = ({ persona }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {

        dispatch(iniciarSetPersonaActiva(persona));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button variant="danger" size="sm" onClick={handleOnClick}>
            <i className="fas fa-trash"></i>
        </Button>
    )
}
