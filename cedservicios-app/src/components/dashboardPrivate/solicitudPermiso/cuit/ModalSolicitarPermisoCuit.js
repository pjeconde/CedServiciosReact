import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { closeModal } from '../../../../actions/ui';
import { iniciarSolicitarPermisoCuit } from '../../../../actions/solicitudPermiso';

export const nameModal = 'SolicitarPermisoCuit';

export const ModalSolicitarPermisoCuit = () => {

    const dispatch = useDispatch();
    const { showModal, loading } = useSelector(state => state.ui);
    const { cuitActivo } = useSelector(state => state.cuit);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    const handleOnClickSolicitarPermisoCuit = () => {
        dispatch(iniciarSolicitarPermisoCuit());
    }

    return (
        <Modal
            show={showModal === nameModal}
            size="lg"
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            scrollable>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Solicitar Permiso de un Cuit</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='text-center'>Solicitar Permiso de <b>Administrador</b> para el Cuit: <b>{cuitActivo?.cuit || ''}</b></p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    disabled={loading}
                    variant="primary"
                    onClick={handleOnClickSolicitarPermisoCuit} >
                    Aceptar
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={handleCloseModal}
                    type="button">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
