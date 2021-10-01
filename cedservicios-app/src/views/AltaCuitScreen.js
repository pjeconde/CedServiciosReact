import React from 'react';
import moment from 'moment';
import validator from 'validator';
import Select from 'react-select';

import { Container, Form, Button } from 'react-bootstrap';
import { FormDatosGenericos } from '../components/ui/forms/FormDatosGenericos';
import { PopoverInfo } from '../components/ui/PopoverInfo';
import { useForm } from '../hooks/useForm';
import { recomendaciones } from '../helpers/admin';

const now = moment().format('YYYY-MM-DD');

export const AltaCuitScreen = () => {

    const { values,
        handleInputChange,
        handleDropdownChange,
        handleInputCheck,
        handleInputNumericChange } = useForm({
            cuit: '',
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
            provincia: {},
            condIva: {},
            condIngBruto: {},
            nombreContacto: '',
            email: '',
            telefono: '',
            nroIngBruto: '',
            dateStart: now,
            gln: '',
            codigoInterno: '',
            recomendado: '',
            facturaElectronica: true,
            interfacturas: false,
            nroCertificado: '',
            afip: false,
            certificadoPropio: false
        });

    const {
        cuit,
        email,
        facturaElectronica,
        interfacturas,
        nroCertificado,
        afip,
        certificadoPropio
    } = values;


    const isFormValid = () => {
        if (!cuit || cuit.trim().length < 11) {
            return false;
        }
        else if (!validator.isEmail(email)) {
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            //Conectar con la api
            console.log(values);
        }
    }

    return (
        <div>
            <Container>
                <div className="col-sm-12 col-md-12 col-lg-10 col-xl-6" style={{ marginBottom: '200px' }}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-3 fw-bold t-up">Alta Cuit </h2>
                            <div className="row g-3">
                                <div className="col-sm-5 col-md-4">
                                    <Form.Label htmlFor="cuit">Cuit</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type="text"
                                            name="cuit"
                                            required
                                            autoComplete="off"
                                            minLength="11"
                                            maxLength="11"
                                            value={cuit || ''}
                                            onChange={handleInputNumericChange} />
                                        <PopoverInfo
                                            key="popover-cuitVendedor"
                                            boxElement="button"
                                            placement="right"
                                            title="Datos del vendedor"
                                            body="En esta página se registran todos los datos de la persona que emitirá comprobantes de venta." />
                                    </div>
                                </div>
                                <FormDatosGenericos
                                    formValues={values}
                                    handleInputChange={handleInputChange}
                                    handleDropdownChange={handleDropdownChange}
                                    handleInputNumericChange={handleInputNumericChange}
                                />
                                <div className="col-sm-6 col-md-6">
                                    <Form.Label htmlFor="recomendado">¿Cómo nos conoció?</Form.Label>
                                    <Select
                                        name="recomendado"
                                        placeholder=""
                                        options={recomendaciones}
                                        onChange={handleDropdownChange}
                                        classNamePrefix="react-select" />
                                </div>
                                <div className="col-sm-6 col-md-12">
                                    <Form.Label htmlFor="facturaElectronica">Servicios</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        name="facturaElectronica"
                                        label="Factura electrónica"
                                        checked={facturaElectronica}
                                        onChange={handleInputCheck} />
                                </div>
                                <h5 className="my-4 fw-bold">
                                    Destinos de comprobantes
                                    (para servicio de
                                    factura electrónica)
                                </h5>
                                <div className="col-sm-6 col-md-6">
                                    <div className="input-group d-flex align-items-center">
                                        <Form.Check
                                            name="interfacturas"
                                            label="Interfacturas"
                                            checked={interfacturas}
                                            onChange={handleInputCheck} />
                                        <PopoverInfo
                                            key="popover-interfacturas"
                                            boxElement="i"
                                            placement="right"
                                            title="Interfacturas (Interbanking)"
                                            body="Marque este campo si gestionará el CAE a través de Interfacturas, en forma ONLINE.
                                Si solo genera archivos XML para subir en el Sitio Web de Interfacturas de forma manual, no debe marcar esta casilla." />
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6">
                                    <div className="input-group d-flex align-items-center">
                                        <Form.Check
                                            name="afip"
                                            label="AFIP"
                                            checked={afip}
                                            onChange={handleInputCheck} />
                                        <PopoverInfo
                                            key="popover-Afip"
                                            boxElement="i"
                                            placement="right"
                                            title="AFIP"
                                            body="Marque este campo si gestionará el CAE a través de la AFIP, en forma ONLINE." />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 d-flex align-items-center flex-wrap">
                                    <div className="col-sm-6 col-md-6">
                                        <div className="input-group d-flex align-items-center">
                                            <Form.Check
                                                name="certificadoPropio"
                                                label="Certificado propio"
                                                checked={certificadoPropio}
                                                onChange={handleInputCheck} />
                                            <PopoverInfo
                                                key="popover-certificadoPropio"
                                                boxElement="i"
                                                placement="right"
                                                title="¿Usa certificado propio?"
                                                body="Marque esta casilla únicamente si:
                                    Genera el CAE con la AFIP y tiene Certificado Digital propio generado en la AFIP.
                                    (Si genera el CAE con AFIP pero utiliza el Certificado de Cedeira SF SRL, luego de haber delegado, no marque esta casilla)" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6">
                                        <Form.Label htmlFor="nroCertificado">Nro. Certificado</Form.Label>
                                        <div className="input-group d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                name="nroCertificado"
                                                minLength="12"
                                                maxLength="12"
                                                value={nroCertificado}
                                                onChange={handleInputChange} />
                                            <PopoverInfo
                                                key="popover-nroCertificado"
                                                boxElement="button"
                                                placement="right"
                                                title="Certificado"
                                                body="Ingresar el número de serie del certificado solicitado a Interfacturas. Es de 12 dígitos." />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-3">
                                    <Button className="w-100" type="submit" variant="primary">
                                        Alta
                                    </Button>
                                </div>
                                <div className="col-sm-4 col-md-3 mt-3">
                                    <Button className="w-100" variant="secondary">
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}
