import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
import { Modal, Form, Button, FormCheck } from 'react-bootstrap';

import {
    provincias,
    condicionesIva,
    condicionesIngresoBruto,
    tiposPuntoVenta
} from '../../../helpers/datosComunes';
import { useForm } from '../../../hooks/useForm';
import { closeModal, removeError } from '../../../actions/ui';
import { camelCase } from '../../../helpers/camelCase';
import { iniciarActualizarPuntoVenta, iniciarAgregarPuntoVenta, iniciarEliminarPuntoVenta, removerPuntoVentaActivo } from '../../../actions/puntoVenta';
import { getCamposHabilitados } from '../../../helpers/puntoVenta/getCamposHabilitados';


const initPuntoVenta = {
    numeroPuntoVenta: '',
    tipoPuntoVenta: tiposPuntoVenta[1],
    provincia: provincias[1],
    condicionIva: condicionesIva[0],
    condicionIngresoBruto: condicionesIngresoBruto[0],
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    sector: '',
    torre: '',
    manzana: '',
    localidad: '',
    codigoPostal: '',
    nombreContacto: '',
    emailContacto: '',
    telefonoContacto: '',
    codigoInterno: '',
    numeroIngresoBruto: '',
    fechaInicioActividades: moment().format("YYYY-MM-DD"),
    usaSetPropioDeDatosCuit: true
};

const nameModal = 'modalPuntoVenta';
const styleTipoPuntoVenta = { height: '250px' };

export const ModalPuntoVenta = ({ unidadNegocio }) => {

    const { showModal, typeModal, loading, errores } = useSelector(state => state.ui);
    const { cuitActivo, unidadNegocioActivo, puntoVentaActivo } = useSelector(state => state.cuit);
    const dispatch = useDispatch();
    const camposHabilitados = useMemo(() => getCamposHabilitados(typeModal), [typeModal]);
    const [customStyle, setCustomStyle] = useState('');

    const {
        values: formValues,
        errors,
        setErrors,
        handleDropdownChange,
        handleInputNumericChange,
        handleInputChange,
        handleInputCheck,
        reset } = useForm(initPuntoVenta);

    const {
        numeroPuntoVenta,
        tipoPuntoVenta,
        provincia,
        condicionIva,
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
        codigoInterno,
        numeroIngresoBruto,
        fechaInicioActividades,
        usaSetPropioDeDatosCuit
    } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(removerPuntoVentaActivo());
        dispatch(removeError());
        reset(initPuntoVenta);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (puntoVentaActivo) {
            dispatch(iniciarActualizarPuntoVenta(formValues));
        }
        else {
            dispatch(iniciarAgregarPuntoVenta(
                {
                    ...formValues,
                    idCuit: cuitActivo.id,
                    idUnidadNegocio: unidadNegocioActivo.id
                }
            ));
        }
    }

    const handleEliminarPuntoVenta = () => {
        dispatch(iniciarEliminarPuntoVenta());
        dispatch(closeModal());
    }

    useEffect(() => {
        if (puntoVentaActivo) {
            reset(puntoVentaActivo);
        }
        else {
            reset(initPuntoVenta);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [puntoVentaActivo])

    useEffect(() => {
        if (errores) {
            let err = {};
            Object.keys(errores).map((key) => err[camelCase(key)] = errores[key][0]);
            setErrors(err);
        }
    }, [errores, setErrors])

    useEffect(() => {
        return () => {
            dispatch(removeError());
        }
    }, [dispatch])

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
                                    'Alta Punto de Venta'
                                    :
                                    (typeModal === 'Actualizar')
                                        ?
                                        'Modificación del Punto de Venta'
                                        :
                                        (typeModal === 'Detalle')
                                            ?
                                            'Detalle del Punto de Venta'
                                            :
                                            (puntoVentaActivo?.estado?.id === 1)
                                                ?
                                                'Desactivar Punto de Venta'
                                                :
                                                'Activar Punto de Venta'
                            }
                        </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <div className="row g-3">
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <Form.Group>
                                    <Form.Label>Unidad de Negocio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="unidadNegocio"
                                        readOnly
                                        value={unidadNegocio.descripcion} />
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Group controlId="formNumeroPuntoVenta">
                                    <Form.Label>Nº Punto de Venta</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numeroPuntoVenta"
                                        required
                                        isInvalid={!!errors?.numeroPuntoVenta}
                                        disabled={!camposHabilitados["numeroPuntoVenta"]}
                                        minLength="11"
                                        maxLength="11"
                                        autoComplete="off"
                                        value={numeroPuntoVenta || ''}
                                        onChange={handleInputNumericChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.numeroPuntoVenta}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4" style={{ ...customStyle }}>
                                <Form.Label htmlFor="tipoPuntoVenta">Tipo Punto de Venta</Form.Label>
                                <Select
                                    name="tipoPuntoVenta"
                                    isDisabled={!camposHabilitados["tipoPuntoVenta"]}
                                    placeholder=""
                                    onMenuOpen={() => setCustomStyle(styleTipoPuntoVenta)}
                                    onMenuClose={() => setCustomStyle('')}
                                    options={tiposPuntoVenta}
                                    value={tipoPuntoVenta}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                        </div>
                        {
                            (typeModal !== 'Detalle' ||
                                (typeModal === 'Detalle' && !usaSetPropioDeDatosCuit)) &&
                            (
                                <div className="row g-3 mt-3">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <FormCheck
                                            type="switch"
                                            name="usaSetPropioDeDatosCuit"
                                            label={
                                                <label>
                                                    <strong> Usa datos Cuit </strong>
                                                    (se refiere a Domicilio, Contacto y Datos Impositivos e Identificatorios)
                                                </label>
                                            }
                                            checked={usaSetPropioDeDatosCuit || ''}
                                            onChange={handleInputCheck} />
                                    </div>
                                    <div hidden={usaSetPropioDeDatosCuit} className="row g-3 animate__animated animate__fadeInUp">
                                        <div className="col-sm-12 col-md-12 col-lg-4">
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
                                            <Form.Group >
                                                <Form.Label>Localidad</Form.Label>
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
                                        <div className="col-sm-12 col-md-4 col-lg-2">
                                            <Form.Group>
                                                <Form.Label>Código Postal</Form.Label>
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
                                        <div className="col-sm-12 col-md-8 col-lg-8">
                                            <Form.Group>
                                                <Form.Label>Calle</Form.Label>
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
                                        <div className="col-sm-6 col-md-4 col-lg-2">
                                            <Form.Group>
                                                <Form.Label>Numero</Form.Label>
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
                                            <Form.Label htmlFor="condicionIva">Cond. IVA</Form.Label>
                                            <Select
                                                name="condicionIva"
                                                isDisabled={!camposHabilitados["condicionIva"]}
                                                placeholder=""
                                                options={condicionesIva}
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
                                                options={condicionesIngresoBruto}
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
                                    </div>
                                </div>
                            )
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        (typeModal) !== 'Detalle'
                        &&
                        (
                            <>
                                {
                                    (typeModal === 'Eliminar')
                                        ?
                                        (
                                            <Button
                                                type="button"
                                                disabled={loading}
                                                variant={puntoVentaActivo?.estado?.id === 1 ? 'danger' : 'success'}
                                                onClick={handleEliminarPuntoVenta}>
                                                {puntoVentaActivo?.estado?.id === 1 ? 'Desactivar' : 'Activar'}
                                            </Button>
                                        )
                                        :
                                        (
                                            <Button type="submit" disabled={loading} variant="primary" onClick={handleSubmit} >
                                                Aceptar
                                            </Button>
                                        )
                                }
                                <Button type="button" variant="secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </Button>
                            </>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </div >
    )
}
