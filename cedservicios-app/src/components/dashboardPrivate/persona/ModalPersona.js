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
import { camelCase } from '../../../helpers/camelCase';


const nameModal = 'modalPersona';

const initPerson = {
    numeroDocumento: '',
    tipoPersona: tipoDePersonas[2],
    tipoDocumento: { value: 80, label: 'CUIT' },
    provincia: provincias[1],
    condicionIva: condIva[0],
    condicionIngresoBruto: condIngBrutos[0],
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    sector: '',
    torre: '',
    manzana: '',
    localidad: '',
    codigoPostal: '',
    identificador: '',
    razonSocial: '',
    nombreContacto: '',
    emailContacto: '',
    telefonoContacto: '',
    gln: 0,
    codigoInterno: '',
    numeroIngresoBruto: '',
    fechaInicioActividades: moment().format("YYYY-MM-DD"),
};

export const ModalPersona = () => {

    const { showModal, typeModal, loading, errores } = useSelector(state => state.ui);
    const { personaActiva } = useSelector(state => state.persona);
    const { cuit } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const camposHabilitados = useMemo(() => getCamposHabilitados(typeModal), [typeModal]);

    const {
        values: formValues,
        errors,
        setErrors,
        handleDropdownChange,
        handleInputNumericChange,
        handleInputChange,
        reset
    } = useForm(initPerson);

    const { tipoPersona,
        tipoDocumento,
        numeroDocumento,
        identificador,
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
        nombreContacto,
        emailContacto,
        telefonoContacto,
        gln,
        codigoInterno } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(removerPersonaActiva());
        reset(initPerson);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (personaActiva) {
            dispatch(iniciarActualizarPersona(formValues));
        }
        else {
            dispatch(iniciarAgregarPersona(formValues));
            // handleCloseModal();
        }

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

    useEffect(() => {
        if (errores) {
            let err = {};
            Object.keys(errores).map((key) => err[camelCase(key)] = errores[key][0]);
            setErrors(err);
        }
    }, [errores, setErrors])

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
                    <Form noValidate onSubmit={handleSubmit}>
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
                                    required
                                    isDisabled={!camposHabilitados["tipoDocumento"]}
                                    options={tipoDocumentos}
                                    classNamePrefix="react-select"
                                    value={tipoDocumento}
                                    onChange={handleDropdownChange} />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Group controlId="control-1">
                                    <Form.Label>Numero documento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numeroDocumento"
                                        required
                                        isInvalid={!!errors?.numeroDocumento}
                                        disabled={!camposHabilitados["numeroDocumento"]}
                                        autoComplete="off"
                                        value={numeroDocumento}
                                        onChange={handleInputNumericChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.numeroDocumento}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <Form.Group>
                                    <Form.Label>Identificador</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="identificador"
                                        required
                                        isInvalid={!!errors?.identificador}
                                        disabled={!camposHabilitados["identificador"]}
                                        autoComplete="off"
                                        maxLength="50"
                                        value={identificador}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.identificador}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <Form.Group>
                                    <Form.Label htmlFor="razonSocial">Razón social</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="razonSocial"
                                        required
                                        isInvalid={!!errors?.razonSocial}
                                        disabled={!camposHabilitados["razonSocial"]}
                                        autoComplete="off"
                                        value={razonSocial}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.razonSocial}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Group>
                                    <Form.Label htmlFor="nombreContacto">Nombre de Contacto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombreContacto"
                                        disabled={!camposHabilitados["nombreContacto"]}
                                        required
                                        isInvalid={!!errors?.nombreContacto}
                                        value={nombreContacto || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nombreContacto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Group>
                                    <Form.Label htmlFor="telefono">Telefono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="telefonoContacto"
                                        disabled={!camposHabilitados["telefonoContacto"]}
                                        required
                                        isInvalid={!!errors?.telefonoContacto}
                                        autoComplete="none"
                                        value={telefonoContacto || ''}
                                        onChange={handleInputNumericChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.telefonoContacto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Form.Group>
                                    <Form.Label htmlFor="emailContacto">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="emailContacto"
                                        disabled={!camposHabilitados["emailContacto"]}
                                        required
                                        isInvalid={!!errors?.emailContacto}
                                        autoComplete="none"
                                        value={emailContacto || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.emailContacto}
                                    </Form.Control.Feedback>
                                </Form.Group>
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
                                <Form.Group>
                                    <Form.Label htmlFor="localidad">Localidad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="localidad"
                                        disabled={!camposHabilitados["localidad"]}
                                        required
                                        isInvalid={!!errors?.localidad}
                                        value={localidad || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.localidad}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <Form.Group>
                                    <Form.Label htmlFor="codigoPostal">Código Postal</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="codigoPostal"
                                        disabled={!camposHabilitados["codigoPostal"]}
                                        required
                                        isInvalid={!!errors?.codigoPostal}
                                        value={codigoPostal || ''}
                                        onChange={handleInputChange}
                                        maxLength="6" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.codigoPostal}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-6">
                                <Form.Group>
                                    <Form.Label htmlFor="calle">Calle</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="calle"
                                        disabled={!camposHabilitados["calle"]}
                                        required
                                        isInvalid={!!errors?.calle}
                                        value={calle || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.calle}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Group>
                                    <Form.Label htmlFor="numero">Numero</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numero"
                                        disabled={!camposHabilitados["numero"]}
                                        autoComplete="off"
                                        required
                                        isInvalid={!!errors?.numero}
                                        value={numero || ''}
                                        onChange={handleInputNumericChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.numero}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Group>
                                    <Form.Label htmlFor="piso">Piso</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        name="piso"
                                        isInvalid={!!errors?.piso}
                                        disabled={!camposHabilitados["piso"]}
                                        value={piso || ''}
                                        onChange={handleInputNumericChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.piso}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Group>
                                    <Form.Label htmlFor="departamento">Departamento.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        name="departamento"
                                        isInvalid={!!errors?.departamento}
                                        disabled={!camposHabilitados["departamento"]}
                                        value={departamento || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.departamento}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Group>
                                    <Form.Label htmlFor="sector">Sector</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        name="sector"
                                        isInvalid={!!errors?.sector}
                                        disabled={!camposHabilitados["sector"]}
                                        value={sector || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sector}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Group>
                                    <Form.Label htmlFor="torre">Torre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        name="torre"
                                        isInvalid={!!errors?.torre}
                                        disabled={!camposHabilitados["torre"]}
                                        value={torre || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.torre}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <Form.Group>
                                    <Form.Label htmlFor="manzana">Manzana</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        name="manzana"
                                        isInvalid={!!errors?.manzana}
                                        disabled={!camposHabilitados["manzana"]}
                                        value={manzana || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.manzana}
                                    </Form.Control.Feedback>
                                </Form.Group>
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
                                <Form.Group>
                                    <Form.Label htmlFor="numeroIngresoBruto">Ing. Brutos</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numeroIngresoBruto"
                                        isInvalid={!!errors?.numeroIngresoBruto}
                                        disabled={!camposHabilitados["numeroIngresoBruto"]}
                                        value={numeroIngresoBruto}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.numeroIngresoBruto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-8 col-lg-6">
                                <Form.Group>
                                    <Form.Label htmlFor="fechaInicioActividades">Fecha inicio de actividades</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaInicioActividades"
                                        isInvalid={!!errors?.fechaInicioActividades}
                                        disabled={!camposHabilitados["fechaInicioActividades"]}
                                        value={fechaInicioActividades}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fechaInicioActividades}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <Form.Group>
                                    <Form.Label htmlFor="gln">GLN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="gln"
                                        isInvalid={!!errors?.gln}
                                        disabled={!camposHabilitados["gln"]}
                                        maxLength="13"
                                        value={gln || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.gln}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <Form.Group>
                                    <Form.Label htmlFor="codigoInterno">Codigo interno</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="codigoInterno"
                                        isInvalid={!!errors?.codigoInterno}
                                        disabled={!camposHabilitados["codigoInterno"]}
                                        maxLength="20"
                                        value={codigoInterno || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.codigoInterno}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
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
