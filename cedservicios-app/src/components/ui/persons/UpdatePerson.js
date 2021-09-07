import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { personSetActive } from '../../../actions/persons';
import { openModal } from '../../../actions/ui';

const nameModal = 'modalPerson';

export const UpdatePerson = ({ person }) => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(personSetActive(person));
        dispatch(openModal(nameModal));
    }

    return (
        <Button variant="secondary" size="sm" onClick={handleOnClick}>
            <i className="fas fa-edit"></i>
        </Button>
    )
}
