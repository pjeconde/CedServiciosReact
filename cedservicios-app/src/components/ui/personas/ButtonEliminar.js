import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setPersonaActiva } from '../../../actions/persona';
import { openModal } from '../../../actions/ui';

const nameModal = 'modalEliminarPersona';
const typeModal = 'Eliminar';

export const ButtonEliminar = ({persona}) => {
    
    const dispatch = useDispatch();
    
    const handleOnClick = () => {
        let { tipoDocumento,
            condicionIva,
            condicionIngresoBruto,
            provincia } = persona;
        dispatch(setPersonaActiva({
            ...persona,
            tipoDocumento: { value: tipoDocumento.id, label: tipoDocumento.descripcion },
            condicionIva: { value: condicionIva.id, label: condicionIva.descripcion },
            condicionIngresoBruto: { value: condicionIngresoBruto.id, label: condicionIngresoBruto.descripcion },
            provincia: { value: provincia.id, label: provincia.descripcion }
        }));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <Button variant="danger" size="sm" onClick={handleOnClick}>
            <i className="fas fa-trash"></i>
        </Button>
    )
}
