import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Select from 'react-select';
import {
    Modal,
    Button,
    Form,
    InputGroup
} from 'react-bootstrap';

import { closeModal } from '../../../actions/ui';
import { personClearActive, personStartAddNew, personStartUpdate } from '../../../actions/persons';
import { tipoDePersonas } from '../../../helpers/tipoPersona';
import { tipoDocumentos } from '../../../helpers/tipoDocumento';
import { condIngBrutos, condIva, provincias } from '../../../helpers/admin';
import { useForm } from '../../../hooks/useForm';


const nameModal = 'modalPerson';

const initPerson = {
    nroDocumento: '',
    tipoPersona: {
        value: 'Ambos',
        label: 'Ambos'
    },
    tipoDocumento: {
        value: 80,
        label: 'CUIT'
    },
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
    dateStart: moment().format("YYYY-MM-DD"),
    gln: '',
    codigoInterno: '',
    estado: true
};

export const ModalPerson = () => {

    const { showModal } = useSelector(state => state.ui);
    const { activePerson } = useSelector(state => state.person);
    const { cuit } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {
        values: formValues,
        handleDropdownChange,
        handleInputNumericChange,
        handleInputChange,
        setValues
    } = useForm(initPerson);

    const { tipoPersona,
        tipoDocumento,
        nroDocumento,
        idPersona,
        razonSocial,
        calle,
        nro,
        piso,
        depto,
        sector,
        torre,
        manzana,
        localidad,
        codigoPostal,
        nombreContacto,
        email,
        telefono,
        nroIngBruto,
        dateStart,
        gln,
        codigoInterno } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(personClearActive());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);

        if (activePerson) {
            dispatch(personStartUpdate(formValues));
        }
        else {
            dispatch(personStartAddNew(formValues));
        }
    }

    useEffect(() => {

        if (activePerson) {
            setValues(activePerson);
        }
        else {
            setValues(initPerson);
        }

    }, [activePerson, setValues])

    return (
        <div>
            <Modal
                show={showModal === nameModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                scrollable={true}
                size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className="fw-bold" >{(activePerson) ? 'Modificación de Persona' : 'Alta de Persona'}</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit}>
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
                                    value={tipoPersona}
                                    onChange={handleDropdownChange} />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Label>Tipo documento</Form.Label>
                                <Select
                                    isDisabled={!!activePerson}
                                    name="tipoDocumento"
                                    options={tipoDocumentos}
                                    classNamePrefix="react-select"
                                    value={tipoDocumento}
                                    onChange={handleDropdownChange} />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Label>Nro documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled={!!activePerson}
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
                                    disabled={!!activePerson}
                                    name="idPersona"
                                    autoComplete="off"
                                    maxLength="50"
                                    value={idPersona}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <Form.Label htmlFor="razonSocial">Razón social</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="razonSocial"
                                    autoComplete="off"
                                    value={razonSocial}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="nombreContacto">Nombre de Contacto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombreContacto"
                                    required
                                    value={nombreContacto}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="telefono">Telefono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    required
                                    autoComplete="none"
                                    value={telefono}
                                    onChange={handleInputNumericChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    required
                                    autoComplete="none"
                                    value={email}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="provincia">Provincia</Form.Label>
                                <Select
                                    name="provincia"
                                    placeholder=""
                                    options={provincias}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="localidad">Localidad</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="localidad"
                                    required
                                    value={localidad}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <Form.Label htmlFor="codigoPostal">Código Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codigoPostal"
                                    required
                                    value={codigoPostal}
                                    onChange={handleInputChange}
                                    maxLength="6" />
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-6">
                                <Form.Label htmlFor="calle">Calle</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="calle"
                                    required
                                    value={calle}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="nro">Nro.</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="nro"
                                    required
                                    value={nro}
                                    onChange={handleInputNumericChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="piso">Piso</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="piso"
                                    value={piso}
                                    onChange={handleInputNumericChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="depto">Depto.</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="depto"
                                    value={depto}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="sector">Sector</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="sector"
                                    value={sector}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="torre">Torre</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="torre"
                                    value={torre}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="manzana">Manzana</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="manzana"
                                    value={manzana}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <Form.Label htmlFor="condIva">Cond. IVA</Form.Label>
                                <Select
                                    name="condIva"
                                    placeholder=""
                                    options={condIva}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <Form.Label htmlFor="condIngBruto">Cond. Ing Brutos</Form.Label>
                                <Select
                                    name="condIngBruto"
                                    placeholder=""
                                    options={condIngBrutos}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-2">
                                <Form.Label htmlFor="nroIngBruto">Ing. Brutos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nroIngBruto"
                                    value={nroIngBruto}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-6">
                                <Form.Label htmlFor="dateStart">Fecha inicio de actividades</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateStart"
                                    value={dateStart}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <Form.Label htmlFor="gln">GLN</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="gln"
                                    maxLength="13"
                                    value={gln}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <Form.Label htmlFor="codigoInterno">Codigo interno</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codigoInterno"
                                    maxLength="20"
                                    value={codigoInterno}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" onClick={handleSubmit} >
                        Aceptar
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
