import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { closeModal } from '../../../../actions/ui';
import { TipoPermisosUnidadNegocio } from '../../../../helpers/tipoPermisos';
import { iniciarRemoverUnidadNegocioActivo } from '../../../../actions/solicitudPermiso';


export const nameModal = 'SolicitarPermisoUnidadNegocio';
const styleTipoPermisoSolicitado = { height: '190px' };

export const ModalSolicitarPermisoUnidadNegocio = () => {

    const dispatch = useDispatch();
    const { showModal, loading } = useSelector(state => state.ui);
    const { unidadNegocioActivo } = useSelector(state => state.solicitudPermiso);
    const [permisoSeleccionado, setPermisoSeleccionado] = useState(TipoPermisosUnidadNegocio[0]);
    const [customStyle, setCustomStyle] = useState('');

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(iniciarRemoverUnidadNegocioActivo());
    }

    const handleOnClickSolicitarPermisoUnidadNegocio = () => {
        console.log('dispatch(iniciarSolicitarPermisoUnidadNegocio)');
    }

    const handleDropdownChange = (selectedOption) => {
        setPermisoSeleccionado(selectedOption);
    }

    return (
        <Modal
            show={showModal === nameModal}
            size="lg"
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            scrollable>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4>Solicitar Permiso para una Unidad de Negocio</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ ...customStyle }}>
                <div className='d-flex justify-content-evenly'>
                    <div className='d-flex align-items-center'>
                        <h5><b>Unidad de Negocio:</b> {unidadNegocioActivo?.descripcion} </h5>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <Form.Label htmlFor="tipoPermiso">Tipo de Permiso</Form.Label>
                        <Select
                            name="tipoPermiso"
                            placeholder=""
                            onMenuOpen={() => setCustomStyle(styleTipoPermisoSolicitado)}
                            onMenuClose={() => setCustomStyle('')}
                            value={permisoSeleccionado}
                            options={TipoPermisosUnidadNegocio}
                            onChange={handleDropdownChange}
                            classNamePrefix="react-select" />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    disabled={loading}
                    variant="primary"
                    onClick={handleOnClickSolicitarPermisoUnidadNegocio} >
                    Aceptar
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={handleCloseModal}
                    type="button">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
