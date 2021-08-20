import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from '../../../hooks/useForm';

import { PopoverInfo } from '../../ui/PopoverInfo';
import {
    condIngBrutos,
    condIva,
    provincias,
    recomendaciones
} from '../../../helpers/admin';


export const FormCuit = ({
    title,
    tipo,
    formValues,
    handleSubmit
}) => {

    const { values,
        handleInputChange,
        handleDropdownChange,
        handleInputCheck,
        handleInputNumericChange } = useForm({
            ...formValues
        });

    const {
        cuit,
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
        codigoInterno,
        facturaElectronica,
        interfacturas,
        nroCertificado,
        afip,
        certificadoPropio
    } = values;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="mb-3 fw-bold t-up">{title}</h2>
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
                    <div className="col-sm-7 col-md-8">
                        <Form.Label htmlFor="razonSocial">Razón social</Form.Label>
                        <Form.Control
                            type="text"
                            name="razonSocial"
                            autoComplete="off"
                            value={razonSocial}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-6">
                        <Form.Label htmlFor="nombreContacto">Nombre de Contacto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreContacto"
                            required
                            value={nombreContacto}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-6">
                        <Form.Label htmlFor="telefono">Telefono</Form.Label>
                        <Form.Control
                            type="text"
                            name="telefono"
                            required
                            autoComplete="none"
                            value={telefono}
                            onChange={handleInputNumericChange} />
                    </div>
                    <div className="col-sm-6">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            required
                            autoComplete="none"
                            value={email}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-6">
                        <Form.Label htmlFor="provincia">Provincia</Form.Label>
                        <Select
                            name="provincia"
                            placeholder=""
                            options={provincias}
                            onChange={handleDropdownChange}
                            classNamePrefix="react-select" />
                    </div>
                    <div className="col-sm-6">
                        <Form.Label htmlFor="localidad">Localidad</Form.Label>
                        <Form.Control
                            type="text"
                            name="localidad"
                            required
                            value={localidad}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-3">
                        <Form.Label htmlFor="codigoPostal">Código Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigoPostal"
                            required
                            value={codigoPostal}
                            onChange={handleInputChange}
                            maxLength="6" />
                    </div>
                    <div className="col-sm-6">
                        <Form.Label htmlFor="calle">Calle</Form.Label>
                        <Form.Control
                            type="text"
                            name="calle"
                            required
                            value={calle}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-2">
                        <Form.Label htmlFor="nro">Nro.</Form.Label>
                        <Form.Control
                            type="text"
                            autoComplete="off"
                            name="nro"
                            required
                            value={nro}
                            onChange={handleInputNumericChange} />
                    </div>
                    <div className="col-sm-2">
                        <Form.Label htmlFor="piso">Piso</Form.Label>
                        <Form.Control
                            type="text"
                            autoComplete="off"
                            name="piso"
                            value={piso}
                            onChange={handleInputNumericChange} />
                    </div>
                    <div className="col-sm-2">
                        <Form.Label htmlFor="depto">Depto.</Form.Label>
                        <Form.Control
                            type="text"
                            autoComplete="off"
                            name="depto"
                            value={depto}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-4">
                        <Form.Label htmlFor="sector">Sector</Form.Label>
                        <Form.Control
                            type="text"
                            autoComplete="off"
                            name="sector"
                            value={sector}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-4">
                        <Form.Label htmlFor="torre">Torre</Form.Label>
                        <Form.Control
                            type="text"
                            autoComplete="off"
                            name="torre"
                            value={torre}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-4">
                        <Form.Label htmlFor="manzana">Manzana</Form.Label>
                        <Form.Control
                            type="text"
                            autoComplete="off"
                            name="manzana"
                            value={manzana}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-6 col-md-5">
                        <Form.Label htmlFor="condIva">Cond. IVA</Form.Label>
                        <Select
                            name="condIva"
                            placeholder=""
                            options={condIva}
                            onChange={handleDropdownChange}
                            classNamePrefix="react-select" />
                    </div>
                    <div className="col-sm-6 col-md-5">
                        <Form.Label htmlFor="condIngBruto">Cond. Ing Brutos</Form.Label>
                        <Select
                            name="condIngBruto"
                            placeholder=""
                            options={condIngBrutos}
                            onChange={handleDropdownChange}
                            classNamePrefix="react-select" />
                    </div>
                    <div className="col-sm-3 col-md-2">
                        <Form.Label htmlFor="nroIngBruto">Ing. Brutos</Form.Label>
                        <Form.Control
                            type="text"
                            name="nroIngBruto"
                            value={nroIngBruto}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-6">
                        <Form.Label htmlFor="dateStart">Fecha inicio de actividades</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateStart"
                            value={dateStart}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-sm-3">
                        <Form.Label htmlFor="gln">GLN</Form.Label>
                        <Form.Control
                            type="text"
                            name="gln"
                            maxLength="13"
                            value={gln}
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3 col-sm-4 ">
                        <Form.Label htmlFor="codigoInterno">Codigo interno</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigoInterno"
                            maxLength="20"
                            value={codigoInterno}
                            onChange={handleInputChange} />
                    </div>
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
                            {
                                (tipo === 'alta')
                                    ?
                                    'Aceptar'
                                    : (tipo === 'baja')
                                        ?
                                        'Baja'
                                        :
                                        'Modificar'
                            }
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
    )
}
