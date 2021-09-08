import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import { closeModal } from '../../../actions/ui';
import { iniciarEliminarPersona, removerPersonaActiva } from '../../../actions/persons';

const nameModal = 'modalEliminarPersona';

export const ModalEliminar = () => {

    const { showModal } = useSelector(state => state.ui);
    const { personaActiva } = useSelector(state => state.persona);
    const { cuit } = useSelector(state => state.auth);
    const [formValues, setFormValues] = useState({
        idPersona: '',
        tipoPersona: '',
        tipoDocumento: '',
        numeroDocumento: '',
        razonSocial: '',
        nombreContacto: ''
    })
    const dispatch = useDispatch();

    const {
        idPersona,
        tipoPersona,
        tipoDocumento,
        numeroDocumento,
        razonSocial,
        nombreContacto
    } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(removerPersonaActiva());
    }

    const handleSubmit = () => {
        dispatch(iniciarEliminarPersona());
        dispatch(closeModal());
    }

    useEffect(() => {
        if (personaActiva) {
            setFormValues(personaActiva);
        }

    }, [personaActiva])

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
                    <h5>Baja de Persona</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="fw-bold">¿Estas seguro que deseas continuar?</p>
                <div className="row g-3" >
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Perteneciente al cuit</InputGroup.Text>
                        <Form.Control value={cuit} readOnly />
                    </InputGroup>
                    <div className="col-sm-6 col-md-6 col-lg-4">
                        <Form.Label>Tipo de persona</Form.Label>
                        <Form.Control
                            type="text"
                            name="tipoPersona"
                            value={tipoPersona?.label || ''}
                            readOnly />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4">
                        <Form.Label>Tipo documento</Form.Label>
                        <Form.Control
                            type="text"
                            name="tipoDocumento"
                            value={tipoDocumento?.label || ''}
                            readOnly />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4">
                        <Form.Label>Nro documento</Form.Label>
                        <Form.Control
                            type="text"
                            name="numeroDocumento"
                            value={numeroDocumento}
                            readOnly
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <Form.Label>Id persona</Form.Label>
                        <Form.Control
                            type="text"
                            name="idPersona"
                            value={idPersona}
                            readOnly
                        />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <Form.Label htmlFor="razonSocial">Razón social</Form.Label>
                        <Form.Control
                            type="text"
                            name="razonSocial"
                            value={razonSocial}
                            readOnly />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <Form.Label htmlFor="nombreContacto">Nombre de Contacto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreContacto"
                            value={nombreContacto}
                            readOnly />
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
