import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Select from 'react-select';
import { Modal, Button, Form } from 'react-bootstrap';

import { useForm } from '../../../hooks/useForm';
import { provincias, condIva, condIngBrutos, recomendaciones } from '../../../helpers/admin';
import { getCamposHabilitados } from '../../../helpers/cuit/getCamposHabilitados';
import { closeModal, removeError } from '../../../actions/ui';
import { iniciarActualizarCuit, iniciarAgregarCuit, removerCuitActivo } from '../../../actions/cuit';
import { camelCase } from '../../../helpers/camelCase';

const initCuit = {
    cuit: '',
    provincia: provincias[1],
    condicionIva: condIva[0],
    condicionIngresoBruto: condIngBrutos[0],
    medio: recomendaciones[0],
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    sector: '',
    torre: '',
    manzana: '',
    localidad: '',
    codigoPostal: '',
    razonSocial: '',
    nombreContacto: '',
    emailContacto: '',
    telefonoContacto: '',
    gln: 0,
    codigoInterno: '',
    numeroIngresoBruto: '',
    fechaInicioActividades: moment().format("YYYY-MM-DD"),
    facturaElectronica: false,
    interfacturas: false,
    afip: false,
    certificadoPropio: false,
    numeroCertificado: ''
};
const nameModal = 'modalCuit';

export const ModalCuit = () => {

    const { showModal, typeModal, loading, errores } = useSelector(state => state.ui);
    const { cuitActivo } = useSelector(state => state.cuit);
    const dispatch = useDispatch();
    const camposHabilitados = useMemo(() => getCamposHabilitados(typeModal), [typeModal]);

    const {
        values: formValues,
        errors,
        setErrors,
        handleDropdownChange,
        handleInputNumericChange,
        handleInputChange,
        handleInputCheck,
        reset } = useForm(initCuit);

    const {
        cuit,
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
        razonSocial,
        nombreContacto,
        emailContacto,
        telefonoContacto,
        gln,
        codigoInterno,
        numeroIngresoBruto,
        fechaInicioActividades,
        facturaElectronica,
        interfacturas,
        afip,
        certificadoPropio,
        numeroCertificado,
        medio
    } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(removerCuitActivo());
        dispatch(removeError());
        reset(initCuit);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cuitActivo) {
            dispatch(iniciarActualizarCuit(formValues));
        }
        else {
            dispatch(iniciarAgregarCuit(formValues));
        }
    }

    useEffect(() => {
        if (cuitActivo) {
            reset(cuitActivo);
        }
        else {
            reset(initCuit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cuitActivo])

    useEffect(() => {
        if (errores) {
            let err = {};
            Object.keys(errores).map((key) => err[camelCase(key)] = errores[key][0]);
            setErrors(err);
        }
    }, [errores, setErrors])

    useEffect(() => {
        return () => {
            // console.log('Componente desmontado');
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
                                    'Alta de Cuit'
                                    :
                                    (typeModal === 'Actualizar')
                                        ?
                                        'Modificación de Cuit'
                                        :
                                        'Detalle de Cuit'
                            }
                        </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <Form.Group controlId="formCuit">
                                    <Form.Label>Cuit</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cuit"
                                        required
                                        isInvalid={!!errors?.cuit}
                                        disabled={!camposHabilitados["cuit"]}
                                        minLength="11"
                                        maxLength="11"
                                        autoComplete="off"
                                        value={cuit || ''}
                                        onChange={handleInputNumericChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cuit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <Form.Group controlId="formRazonSocial">
                                    <Form.Label >Razón social</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="razonSocial"
                                        required
                                        isInvalid={!!errors?.razonSocial}
                                        disabled={!camposHabilitados["razonSocial"]}
                                        autoComplete="off"
                                        value={razonSocial || ''}
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.razonSocial}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
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
                            <div className="col-sm-12 col-md-12 col-lg-5">
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
                            <div className="col-sm-12 col-md-4 col-lg-3">
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
                                    <Form.Label htmlFor="gln">Gln</Form.Label>
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
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <Form.Label htmlFor="medio">¿Cómo nos conoció?</Form.Label>
                                <Select
                                    name="medio"
                                    isDisabled={!camposHabilitados["medio"]}
                                    placeholder=""
                                    options={recomendaciones}
                                    value={medio}
                                    onChange={handleDropdownChange}
                                    classNamePrefix="react-select" />
                            </div>
                            <h6 className="my-4 fw-bold">Destinos de comprobantes (para servicio de factura electrónica)</h6>
                            <div className="col-sm-4 col-md-6 col-lg-4">
                                <Form.Check
                                    name="facturaElectronica"
                                    disabled={!camposHabilitados["facturaElectronica"]}
                                    label="Factura electrónica"
                                    checked={facturaElectronica || ''}
                                    onChange={handleInputCheck} />
                            </div>
                            <div className="col-sm-4 col-md-6 col-lg-4">
                                <Form.Check
                                    name="interfacturas"
                                    disabled={!camposHabilitados["interfacturas"]}
                                    label="Interfacturas"
                                    checked={interfacturas || ''}
                                    onChange={handleInputCheck} />
                            </div>
                            <div className="col-sm-4 col-md-6 col-lg-4">
                                <Form.Check
                                    name="afip"
                                    disabled={!camposHabilitados["afip"]}
                                    label="AFIP"
                                    checked={afip || ''}
                                    onChange={handleInputCheck} />
                            </div>
                            <div className="col-sm-12 col-md-12 d-flex align-items-center flex-wrap">
                                <div className="col-sm-6 col-md-6 col-lg-4">
                                    <Form.Check
                                        name="certificadoPropio"
                                        disabled={!camposHabilitados["certificadoPropio"]}
                                        label="Certificado propio"
                                        checked={certificadoPropio || ''}
                                        onChange={handleInputCheck} />
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-8">
                                    <Form.Group>
                                        <Form.Label >Nro. Certificado</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="numeroCertificado"
                                            disabled={!camposHabilitados["numeroCertificado"]}
                                            minLength="12"
                                            maxLength="12"
                                            value={numeroCertificado || ''}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </div>
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
