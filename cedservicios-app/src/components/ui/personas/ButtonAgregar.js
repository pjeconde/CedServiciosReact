import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { openModal } from '../../../actions/ui';
import { removerPersonaActiva } from '../../../actions/persons';

const nameModal = 'modalPersona';
const typeModal = 'Agregar';

export const ButtonAgregar = () => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(removerPersonaActiva());
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button type="button" variant="secondary" onClick={handleOnClick}>
            <i className="fas fa-plus"></i>
            Agregar
        </Button>
    )
}
