import React from 'react';
import { useSelector } from 'react-redux';

import { Form, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { tipoDePersonas } from '../../../helpers/tipoPersona';
import { tipoDocumentos } from '../../../helpers/tipoDocumento';
import { FormDataGeneric } from '../../ui/forms/FormDataGeneric';

export const FormPersona = ({
    typeModal,
    values,
    handleDropdownChange,
    handleInputNumericChange,
    handleInputChange }) => {

    const { cuit } = useSelector(state => state.auth);

    const { tipoPersona,
        tipoDocumento,
        nroDocumento,
        idPersona } = values;
    
    return (
        <>
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
                        isDisabled={typeModal === 'update'}
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
                        disabled={typeModal === 'update'}
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
                        disabled={typeModal === 'update'}
                        name="idPersona"
                        autoComplete="off"
                        maxLength="50"
                        value={idPersona}
                        onChange={handleInputChange}
                    />
                </div>
                <FormDataGeneric
                    formValues={values}
                    handleInputChange={handleInputChange}
                    handleDropdownChange={handleDropdownChange}
                    handleInputNumericChange={handleInputNumericChange}
                />
            </div>
        </>
    )
}
