import React, { useEffect, useMemo } from 'react';
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
import { removerPersonaActiva, iniciarAgregarPersona, iniciarActualizarPersona } from '../../../actions/persona';
import { tipoDePersonas } from '../../../helpers/tipoPersona';
import { tipoDocumentos } from '../../../helpers/tipoDocumento';
import { condIngBrutos, condIva, provincias } from '../../../helpers/admin';
import { useForm } from '../../../hooks/useForm';
import { getCamposHabilitados } from '../../../helpers/persona/getCamposHabilitados';


const nameModal = 'modalPersona';

const initPerson = {
    numeroDocumento: '',
    tipoPersona: { value: 'Ambos', label: 'Ambos' },
    tipoDocumento: { value: 80, label: 'CUIT' },
    provincia: { value: 1, label: 'Buenos Aires' },
    condicionIva: '',
    condicionIngresoBruto: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    sector: '',
    torre: '',
    manzana: '',
    localidad: '',
    codigoPostal: '',
    descripcion: '',
    razonSocial: '',
    nombre: '',
    email: '',
    telefono: '',
    gln: '',
    codigoInterno: '',
    numeroIngresoBruto: '',
    fechaInicioActividades: moment().format("YYYY-MM-DD"),
};

export const ModalPersona = () => {

    const { showModal, typeModal, loading } = useSelector(state => state.ui);
    const { personaActiva } = useSelector(state => state.persona);
    const { cuit } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const camposHabilitados = useMemo(() => getCamposHabilitados(typeModal), [typeModal]);

    const {
        values: formValues,
        handleDropdownChange,
        handleInputNumericChange,
        handleInputChange,
        reset
    } = useForm(initPerson);

    const { tipoPersona,
        tipoDocumento,
        numeroDocumento,
        descripcion,
        razonSocial,
        numeroIngresoBruto,
        fechaInicioActividades,
        condicionIva,
        provincia,
        condicionIngresoBruto,
        calle,
        numero,
        piso,
        departamento,
        sector,
        torre,
        manzana,
        localidad,
        codigoPostal,
        nombre,
        email,
        telefono,
        gln,
        codigoInterno } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(removerPersonaActiva());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (personaActiva) {
            dispatch(iniciarActualizarPersona(formValues));
        }
        else {
            dispatch(iniciarAgregarPersona(formValues));
        }

        handleCloseModal();
    }

    useEffect(() => {

        if (personaActiva) {
            reset(personaActiva);
        }
        else {
            reset(initPerson);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [personaActiva])

    return (
        <div>
            <Modal
                show={showModal === nameModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                scrollable={true}
                size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className="fw-bold" >
                            {
                                (typeModal === 'Agregar')
                                    ?
                                    'Alta de Persona'
                                    :
                                    (typeModal === 'Actualizar')
                                        ?
                                        'Modificación de Persona'
                                        :
                                        'Detalle de Persona'
                            }
                        </h5>
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
                                    isDisabled={!camposHabilitados["tipoPersona"]}
                                    options={tipoDePersonas}
                                    classNamePrefix="react-select"
                                    value={tipoPersona}
                                    onChange={handleDropdownChange} />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Label>Tipo documento</Form.Label>
                                <Select
                                    name="tipoDocumento"
                                    isDisabled={!camposHabilitados["tipoDocumento"]}
                                    options={tipoDocumentos}
                                    classNamePrefix="react-select"
                                    value={tipoDocumento}
                                    onChange={handleDropdownChange} />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Label>Numero documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numeroDocumento"
                                    disabled={!camposHabilitados["numeroDocumento"]}
                                    autoComplete="off"
                                    maxLength="11"
                                    value={numeroDocumento}
                                    onChange={handleInputNumericChange}
                                />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descripcion"
                                    disabled={!camposHabilitados["descripcion"]}
                                    autoComplete="off"
                                    maxLength="50"
                                    value={descripcion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <Form.Label htmlFor="razonSocial">Razón social</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="razonSocial"
                                    disabled={!camposHabilitados["razonSocial"]}
                                    autoComplete="off"
                                    value={razonSocial}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="nombre">Nombre de Contacto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    disabled={!camposHabilitados["nombre"]}
                                    required
                                    value={nombre || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="telefono">Telefono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    disabled={!camposHabilitados["telefono"]}
                                    required
                                    autoComplete="none"
                                    value={telefono || ''}
                                    onChange={handleInputNumericChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    disabled={!camposHabilitados["email"]}
                                    required
                                    autoComplete="none"
                                    value={email || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="provincia">Provincia</Form.Label>
                                <Select
                                    name="provincia"
                                    isDisabled={!camposHabilitados["provincia"]}
                                    placeholder=""
                                    options={provincias}
                                    value={provincia}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Label htmlFor="localidad">Localidad</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="localidad"
                                    disabled={!camposHabilitados["localidad"]}
                                    required
                                    value={localidad || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <Form.Label htmlFor="codigoPostal">Código Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codigoPostal"
                                    disabled={!camposHabilitados["codigoPostal"]}
                                    required
                                    value={codigoPostal || ''}
                                    onChange={handleInputChange}
                                    maxLength="6" />
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-6">
                                <Form.Label htmlFor="calle">Calle</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="calle"
                                    disabled={!camposHabilitados["calle"]}
                                    required
                                    value={calle || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="numero">Numero</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numero"
                                    disabled={!camposHabilitados["numero"]}
                                    autoComplete="off"
                                    required
                                    value={numero || ''}
                                    onChange={handleInputNumericChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="piso">Piso</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="piso"
                                    disabled={!camposHabilitados["piso"]}
                                    value={piso || ''}
                                    onChange={handleInputNumericChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="departamento">Departamento.</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="departamento"
                                    disabled={!camposHabilitados["departamento"]}
                                    value={departamento || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="sector">Sector</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="sector"
                                    disabled={!camposHabilitados["sector"]}
                                    value={sector || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="torre">Torre</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="torre"
                                    disabled={!camposHabilitados["torre"]}
                                    value={torre || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Label htmlFor="manzana">Manzana</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    name="manzana"
                                    disabled={!camposHabilitados["manzana"]}
                                    value={manzana || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <Form.Label htmlFor="condIva">Cond. IVA</Form.Label>
                                <Select
                                    name="condicionIva"
                                    isDisabled={!camposHabilitados["condicionIva"]}
                                    placeholder=""
                                    options={condIva}
                                    value={condicionIva}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <Form.Label htmlFor="condicionIngresoBruto">Cond. Ing Brutos</Form.Label>
                                <Select
                                    name="condicionIngresoBruto"
                                    isDisabled={!camposHabilitados["condicionIngresoBruto"]}
                                    placeholder=""
                                    options={condIngBrutos}
                                    value={condicionIngresoBruto}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-2">
                                <Form.Label htmlFor="numeroIngresoBruto">Ing. Brutos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numeroIngresoBruto"
                                    disabled={!camposHabilitados["numeroIngresoBruto"]}
                                    value={numeroIngresoBruto}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-6">
                                <Form.Label htmlFor="fechaInicioActividades">Fecha inicio de actividades</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaInicioActividades"
                                    disabled={!camposHabilitados["fechaInicioActividades"]}
                                    value={fechaInicioActividades}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <Form.Label htmlFor="gln">GLN</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="gln"
                                    disabled={!camposHabilitados["gln"]}
                                    maxLength="13"
                                    value={gln || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <Form.Label htmlFor="codigoInterno">Codigo interno</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codigoInterno"
                                    disabled={!camposHabilitados["codigoInterno"]}
                                    maxLength="20"
                                    value={codigoInterno || ''}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        (typeModal) !== 'Detalle'
                        &&
                        (
                            <>
                                <Button type="submit" disabled={loading} variant="primary" onClick={handleSubmit} >
                                    Aceptar
                                </Button>
                                <Button type="button" variant="secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </Button>
                            </>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}
