import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment';

import { closeModal, openModal } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';
import { tipoDePersonas } from '../../../helpers/tipoPersona';
import { tipoDocumentos } from '../../../helpers/tipoDocumento';
import { FormPersona } from '../../ui/forms/FormPersona';

const nameModal = 'altaPersona';
const now = moment().format('YYYY-MM-DD');

export const ModalAdd = () => {

    const dispatch = useDispatch();
    const { showModal } = useSelector(state => state.ui);
    const { cuit } = useSelector(state => state.auth);

    const { values,
        handleDropdownChange,
        handleInputNumericChange,
        handleInputChange,
        reset } = useForm({
            tipoPersona: { value: 'Ambos', label: 'Ambos' },
            tipoDocumento: { value: 'Cuit', label: 'Cuit' },
            nroDocumento: '',
            idPersona: '',
            razonSocial: '',
            calle: '',
            nro: '',
            piso: '',
            depto: '',
            sector: '',
            torre: '',
            manzana: '',
            localidad: '',
            codigoPostal: '',
            nombreContacto: '',
            email: '',
            telefono: '',
            nroIngBruto: '',
            dateStart: now,
            gln: '',
            codigoInterno: ''
        })

    const { tipoPersona,
        tipoDocumento,
        nroDocumento,
        idPersona } = values;

    const handleShow = () => dispatch(openModal(nameModal));

    const handleClose = () => {
        reset();
        dispatch(closeModal());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }

    return (
        <div>
            <Button type="button" variant="secondary" onClick={handleShow}>
                <i className="fas fa-plus"></i>
                Agregar
            </Button>

            <form onSubmit={handleSubmit}>
                <Modal
                    show={showModal === nameModal}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    scrollable={true}
                    size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h5 className="fw-bold" >Alta de Persona</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div className="row g-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Perteneciente al cuit</InputGroup.Text>
                                <Form.Control value={cuit} readOnly />
                            </InputGroup>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Label>Tipo de persona</Form.Label>
                                <Select
                                    name="tipoPersona"
                                    options={tipoDePersonas}
                                    classNamePrefix="react-select"
                                    defaultValue={tipoPersona}
                                    onChange={handleDropdownChange} />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Label>Tipo documento</Form.Label>
                                <Select
                                    name="tipoDocumento"
                                    options={tipoDocumentos}
                                    classNamePrefix="react-select"
                                    defaultValue={tipoDocumento}
                                    onChange={handleDropdownChange} />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Label>Nro documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nroDocumento"
                                    autoComplete="off"
                                    maxLength="8"
                                    value={nroDocumento}
                                    onChange={handleInputNumericChange}
                                />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <Form.Label>Id persona</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="idPersona"
                                    autoComplete="off"
                                    maxLength="50"
                                    value={idPersona}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <FormPersona
                                formValues={values}
                                handleInputChange={handleInputChange}
                                handleDropdownChange={handleDropdownChange}
                                handleInputNumericChange={handleInputNumericChange}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary" onClick={handleSubmit} >
                            Aceptar
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
    )
}
