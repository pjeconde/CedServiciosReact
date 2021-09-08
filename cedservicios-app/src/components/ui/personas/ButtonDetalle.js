import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';
import { setPersonaActiva } from '../../../actions/persons';
import { openModal } from '../../../actions/ui';

const nameModal = 'modalPersona';
const typeModal = 'Detalle';

export const ButtonDetalle = ({ persona }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(setPersonaActiva(persona));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button variant="info" size="sm" onClick={handleOnClick}>
            <i className="fas fa-search-plus"></i>
        </Button>
    )
}
