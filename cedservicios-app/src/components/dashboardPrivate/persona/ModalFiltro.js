import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';
import { Estados } from '../../../helpers/estados';
import { closeModal, openModal } from '../../../actions/ui';
import { agregarFiltro } from '../../../actions/persona';

const nameModal = 'filtroPersona';
const typeModal = 'filtro';

const initForm = {
    razonSocial: '',
    numeroDocumento: '',
    estado: { value: 'Todos', label: 'Todos' }
};

export const ModalFiltro = () => {

    const dispatch = useDispatch();
    const { showModal } = useSelector(state => state.ui);
    const { filtro } = useSelector(state => state.persona);

    const { values,
        handleInputChange,
        handleDropdownChange,
        handleInputNumericChange,
        reset } = useForm(initForm);

    const { razonSocial, numeroDocumento, estado } = values;

    const handleShow = () => dispatch(openModal(nameModal, typeModal));

    const handleClose = () => dispatch(closeModal());

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(agregarFiltro(values));
        handleClose();
    }

    useEffect(() => {
        if (filtro) {
            reset(filtro);
        }
        else {
            reset(initForm);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtro])

    return (
        <div>
            <Button type="button" variant="outline-secondary" onClick={handleShow}>
                <i className="fas fa-filter"></i>
                Filtrar
            </Button>

            <Modal
                show={showModal === nameModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} >
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h5 className="fw-bold">Filtrar por</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row g-3">
                            <div className="col-sm-12 col-md-12">
                                <Form.Label htmlFor="razonSocial">Razón social</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="razonSocial"
                                    autoComplete="off"
                                    value={razonSocial}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <Form.Label htmlFor="numeroDocumento">Numero Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numeroDocumento"
                                    maxLength="8"
                                    autoComplete="off"
                                    value={numeroDocumento}
                                    onChange={handleInputNumericChange} />
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <Form.Label htmlFor="estado">Estado</Form.Label>
                                <Select
                                    name="estado"
                                    options={Estados}
                                    placeholder=""
                                    classNamePrefix="react-select"
                                    defaultValue={estado}
                                    onChange={handleDropdownChange} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">Filtrar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}
