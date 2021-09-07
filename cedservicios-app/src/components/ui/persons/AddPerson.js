import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { openModal } from '../../../actions/ui';
import { personClearActive } from '../../../actions/persons';

const nameModal = 'modalPerson';

export const AddPerson = () => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(personClearActive());
        dispatch(openModal(nameModal));
    }

    return (
        <Button type="button" variant="secondary" onClick={handleOnClick}>
            <i className="fas fa-plus"></i>
            Agregar
        </Button>
    )
}
