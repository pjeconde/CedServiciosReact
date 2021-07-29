import React from 'react';
import {
    Container,
    Row,
    Form,
    Col,
    Button,
} from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment';
import validator from 'validator';
import {
    condIngBrutos,
    condIva,
    provincias,
    recomendaciones
} from '../helpers/admin';
import { useForm } from '../hooks/useForm';

import '../styles/admin-cuit.css';

const now = moment().format('YYYY-MM-DD');

export const AltaCuitScreen = () => {

    const { values: formValues,
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
            cp: '',
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
            interfacturas: true,
            nroCertificado: '',
            afip: true,
            certificadoPropio: true
        });

    const { cuit,
        razonSocial,
        calle,
        nro,
        piso,
        depto,
        sector,
        torre,
        manzana,
        localidad,
        cp,
        nombreContacto,
        email,
        telefono,
        nroIngBruto,
        dateStart,
        gln,
        codigoInterno,
        facturaElectronica,
        interfacturas,
        nroCertificado,
        afip,
        certificadoPropio
    } = formValues;

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
            console.log(formValues);
        }
    }

    return (
        <div>
            <hr />
            <Container fluid>
                <h2 style={{ marginTop: '10px' }}>Alta Cuit</h2>
                <Form className="form-alta-cuit" onSubmit={handleSubmit}>
                    <Row className="mb-2 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={2}
                            className="mb-2"
                            controlId="cuit">
                            <Form.Label>cuit</Form.Label>
                            <Form.Control
                                className="text-center"
                                type="text"
                                name="cuit"
                                required
                                autoComplete="off"
                                maxLength="11"
                                value={cuit}
                                onChange={handleInputNumericChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={3}
                            className="mb-2"
                            controlId="razonSocial">
                            <Form.Label>razón social</Form.Label>
                            <Form.Control
                                type="text"
                                name="razonSocial"
                                autoComplete="off"
                                value={razonSocial}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2 justify-content-md-center" >
                        <Form.Group
                            as={Col}
                            sm={2}
                            className="mb-2"
                            controlId="calle">
                            <Form.Label>calle</Form.Label>
                            <Form.Control
                                type="text"
                                name="calle"
                                required
                                value={calle}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={1}
                            className="mb-2"
                            controlId="nro">
                            <Form.Label>nro</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                name="nro"
                                required
                                value={nro}
                                onChange={handleInputNumericChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={1}
                            className="mb-2"
                            controlId="piso">
                            <Form.Label>piso</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                name="piso"
                                value={piso}
                                onChange={handleInputNumericChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={1}
                            className="mb-2"
                            controlId="departamento">
                            <Form.Label>depto.</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                name="depto"
                                value={depto}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={2}
                            className="mb-2"
                            controlId="sector">
                            <Form.Label>sector</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                name="sector"
                                value={sector}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={1}
                            className="mb-2"
                            controlId="torre">
                            <Form.Label>torre</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                name="torre"
                                value={torre}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={1}
                            className="mb-2"
                            controlId="manzana">
                            <Form.Label>manzana</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                name="manzana"
                                value={manzana}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Col sm={1}></Col>
                    </Row>
                    <Row className="mb-2 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={2}
                            className="mb-2"
                            controlId="localidad">
                            <Form.Label>localidad</Form.Label>
                            <Form.Control
                                type="text"
                                name="localidad"
                                required
                                value={localidad}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={2}
                            className="mb-2"
                            controlId="provincia">
                            <Form.Label>provincia</Form.Label>
                            <Select
                                name="provincia"
                                options={provincias}
                                onChange={handleDropdownChange}
                                classNamePrefix="react-select" />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={1}
                            className="mb-2"
                            controlId="codigoPostal">
                            <Form.Label>C.P</Form.Label>
                            <Form.Control
                                type="text"
                                name="cp"
                                required
                                value={cp}
                                onChange={handleInputChange}
                                maxLength="6" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2 justify-content-md-center">
                        <Form.Group as={Col} sm={2} className="mb-2" controlId="nombreContacto">
                            <Form.Label>nombre de contacto</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombreContacto"
                                required
                                value={nombreContacto}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} sm={2} className="mb-2" controlId="telefono">
                            <Form.Label>telefono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                required
                                autoComplete="none"
                                value={telefono}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Col sm={1}></Col>
                    </Row>
                    <Row className="mb-2 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={3}
                            controlId="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                autoComplete="none"
                                value={email}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Col sm={2}></Col>
                    </Row>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={3}
                            controlId="condIva">
                            <Form.Label>cond. IVA</Form.Label>
                            <Select
                                name="condIva"
                                options={condIva}
                                onChange={handleDropdownChange}
                                classNamePrefix="react-select" />
                        </Form.Group>
                        <Col sm={2}></Col>
                    </Row>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Group as={Col} sm={3} className="mb-2" controlId="condIngBruto">
                            <Form.Label>Con.Ing.Brutos</Form.Label>
                            <Select
                                name="condIngBruto"
                                options={condIngBrutos}
                                onChange={handleDropdownChange}
                                classNamePrefix="react-select" />
                        </Form.Group>
                        <Form.Group as={Col} sm={2} className="mb-2" controlId="nroIngBruto">
                            <Form.Label>Nro.Ing.Brutos</Form.Label>
                            <Form.Control
                                type="text"
                                name="nroIngBruto"
                                value={nroIngBruto}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={3}
                            controlId="dateStart">
                            <Form.Label>fecha inicio de actividades</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateStart"
                                value={dateStart}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Col sm={2}></Col>
                    </Row>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={1}
                            className="mb-2"
                            controlId="gln">
                            <Form.Label >GLN</Form.Label>
                            <Form.Control
                                type="text"
                                name="gln"
                                maxLength="13"
                                value={gln}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm={2}
                            className="mb-2"
                            controlId="codigoInterno" >
                            <Form.Label>codigo interno</Form.Label>
                            <Form.Control
                                type="text"
                                name="codigoInterno"
                                maxLength="20"
                                value={codigoInterno}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Col sm={2}></Col>
                    </Row>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={3}
                            controlId="recomendado">
                            <Form.Label>¿Cómo nos conoció?</Form.Label>
                            <Select
                                name="recomendado"
                                options={recomendaciones}
                                onChange={handleDropdownChange}
                                classNamePrefix="react-select" />
                        </Form.Group>
                        <Col sm={2}></Col>
                    </Row>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Group
                            as={Col}
                            sm={3}
                            controlId="servicio">
                            <Form.Label>servicios</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="facturaElectronica"
                                label="factura electrónica"
                                checked={facturaElectronica}
                                onChange={handleInputCheck} />
                        </Form.Group>
                        <Col sm={2}></Col>
                    </Row>
                    <Row className="mb-3 justify-content-md-center">
                        <h6 className="mb-4 title-comprobantes">
                            Destinos de comprobantes
                            (para servicio de
                            factura electrónica)
                        </h6>
                        <Col sm={1} className="mb-2 checkbox">
                            <Form.Check
                                name="interfacturas"
                                label="interfacturas"
                                checked={interfacturas}
                                onChange={handleInputCheck} />
                        </Col>
                        <Form.Group as={Col} sm={2} className="mb-2" controlId="certificado">
                            <Form.Label>Nro. certificado</Form.Label>
                            <Form.Control
                                type="text"
                                name="nroCertificado"
                                value={nroCertificado}
                                onChange={handleInputChange} />
                        </Form.Group>
                        <Col sm={1} className="mb-2 checkbox">
                            <Form.Check
                                name="afip"
                                label="A.F.I.P"
                                checked={afip}
                                onChange={handleInputCheck} />
                        </Col>
                        <Col sm={2} className="mb-2 checkbox">
                            <Form.Check
                                name="certificadoPropio"
                                label="Certificado propio"
                                checked={certificadoPropio}
                                onChange={handleInputCheck} />
                        </Col>
                    </Row>
                    <Row className="mb-2 justify-content-md-center">
                        <Col sm={1} className="mb-2">
                            <Button type="submit" variant="primary">
                                Aceptar
                            </Button>
                        </Col>
                        <Col sm={1} className="mb-2">
                            <Button variant="secondary">
                                Cancelar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}
