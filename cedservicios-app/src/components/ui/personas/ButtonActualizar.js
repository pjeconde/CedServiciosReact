import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setPersonaActiva } from '../../../actions/persona';
import { openModal } from '../../../actions/ui';

const nameModal = 'modalPersona';
const typeModal = 'Actualizar';

export const ButtonActualizar = ({ persona }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(setPersonaActiva(persona));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button variant="secondary" size="sm" onClick={handleOnClick}>
            <i className="fas fa-edit"></i>
        </Button>
    )
}
