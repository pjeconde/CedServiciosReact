import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { iniciarEliminarCuit, removerCuitActivo } from '../../../actions/cuit';
import { closeModal } from '../../../actions/ui';

const nameModal = 'modalEliminarCuit';

export const ModalEliminar = () => {

    const dispatch = useDispatch();
    const { showModal } = useSelector(state => state.ui);
    const { cuitActivo } = useSelector(state => state.cuit);
    const [formValues, setFormValues] = useState({});

    const {
        cuit,
        razonSocial,
        nombreContacto,
        localidad } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(removerCuitActivo());
    }

    const handleSubmit = () => {
        dispatch(iniciarEliminarCuit());
        dispatch(closeModal());
    }

    useEffect(() => {
        if (cuitActivo) {
            setFormValues(cuitActivo);
        }
    }, [cuitActivo])

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
                    <h5>Baja de Cuit</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-3">
                    <div className="col-sm-6 col-md-6 col-lg-4">
                        <Form.Label>Cuit</Form.Label>
                        <Form.Control
                            type="text"
                            name="cuit"
                            value={cuit || ''}
                            readOnly
                        />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <Form.Label >Razón social</Form.Label>
                        <Form.Control
                            type="text"
                            name="razonSocial"
                            value={razonSocial || ''}
                            readOnly
                        />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <Form.Label>Localidad</Form.Label>
                        <Form.Control
                            type="text"
                            name="localidad"
                            value={localidad || ''}
                            readOnly
                        />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <Form.Label>Nombre contacto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreContacto"
                            value={nombreContacto || ''}
                            readOnly
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="w-25"
                    variant="danger"
                    onClick={handleSubmit}
                    type="button" >Baja</Button>
                <Button
                    className="w-25"
                    variant="outline-secondary"
                    onClick={handleCloseModal}
                    type="button">Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}
