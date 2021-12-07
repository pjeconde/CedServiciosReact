import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';

import { closeModal, removeError } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';
import {
    iniciarActualizarUnidadNegocio,
    iniciarAgregarUnidadNegocio,
    iniciarEliminarUnidadNegocio,
    removerUnidadNegocioActivo
} from '../../../actions/unidadNegocio';
import { camelCase } from '../../../helpers/camelCase';


const nameModal = 'modalUnidadNegocio';
const initUnidadNegocio = { descripcion: '' };

export const ModalUnidadNegocio = ({ cuit }) => {

    const { showModal, typeModal, loading, errores } = useSelector(state => state.ui);
    const { unidadNegocioActivo } = useSelector(state => state.cuit);

    const dispatch = useDispatch();

    const {
        values: formValues,
        errors,
        setErrors,
        handleInputChange,
        reset } = useForm(initUnidadNegocio);

    const { descripcion } = formValues;

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(removerUnidadNegocioActivo());
        dispatch(removeError());
        reset(initUnidadNegocio);
    }

    const handleSubmit = () => {

        if (unidadNegocioActivo) {
            dispatch(iniciarActualizarUnidadNegocio(formValues));
        }
        else {
            dispatch(iniciarAgregarUnidadNegocio({ idCuit: cuit.id, descripcion }));
        }
    }

    const handleEliminarUnidadNegocio = () => {
        dispatch(iniciarEliminarUnidadNegocio());
        dispatch(closeModal());
    }

    useEffect(() => {
        if (errores) {
            let err = {};
            Object.keys(errores).map((key) => err[camelCase(key)] = errores[key][0]);
            setErrors(err);
        }
    }, [errores, setErrors])

    useEffect(() => {
        if (unidadNegocioActivo) {
            reset(unidadNegocioActivo);
        }
        else {
            reset(initUnidadNegocio);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unidadNegocioActivo])

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
                                    'Alta Unidad de Negocio'
                                    :
                                    (typeModal === 'Actualizar')
                                        ?
                                        'Modificación de Unidad de Negocio'
                                        :
                                        (unidadNegocioActivo?.estado?.id === 1)
                                            ?
                                            'Desactivar Unidad de Negocio'
                                            :
                                            'Activar Unidad de Negocio'
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
                                    <Form.Control value={cuit.cuit} readOnly />
                                </Form.Group>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-8">
                                <Form.Group controlId="formDescripcion">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="descripcion"
                                        readOnly={typeModal === 'Eliminar'}
                                        required
                                        isInvalid={!!errors?.descripcion}
                                        // disabled={!camposHabilitados["numeroDocumento"]}
                                        autoComplete="off"
                                        value={descripcion}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.descripcion}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        typeModal === 'Eliminar'
                            ?
                            (
                                <Button
                                    type="button"
                                    disabled={loading}
                                    variant={unidadNegocioActivo?.estado.id === 1 ? 'danger' : 'success'}
                                    onClick={handleEliminarUnidadNegocio}>
                                    {unidadNegocioActivo?.estado.id === 1 ? 'Desactivar' : 'Activar'}
                                </Button>
                            ) :
                            (
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    variant="primary"
                                    onClick={handleSubmit} >
                                    Aceptar
                                </Button>
                            )
                    }
                    <Button type="button" variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
