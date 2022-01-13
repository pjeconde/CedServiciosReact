import React from 'react';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';

import { iniciarSetUnidadNegocioActivo } from '../../../../actions/solicitudPermiso';
import { ButtonSolicitar } from '../../../ui/ButtonSolicitar';
import { openModal } from '../../../../actions/ui';
import { ModalSolicitarPermisoUnidadNegocio, nameModal } from './ModalSolicitarPermisoUnidadNegocio';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 800,
        },
    },
}

export const GrillaSolicitarPermisoUnidadNegocio = ({ data: cuit }) => {

    const { unidadesNegocio } = cuit;
    const dispatch = useDispatch();

    const columnaUnidadesNegocio = [
        {
            name: 'Descripcion',
            selector: 'descripcion',
            grow: 1,
        },
        {
            name: 'Permisos',
            cell: row => <ButtonSolicitar row={row} handleOnClick={handleOnClickSolicitar} />,
            center: true,
            grow: .5
        },
    ];

    const handleOnClickSolicitar = (value) => {
        let typeModal = 'Solicitar';
        dispatch(iniciarSetUnidadNegocioActivo({...value, idCuit: cuit.id}));
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <div className="mx-5 my-4 w-50">
            <div className="container-fluid">
                <div className="header__wrapper header__sub my-2">
                    <div className="header__title_sub mb-auto">
                        <h4>Unidades de Negocio</h4>
                    </div>
                    <div className="header__toolbar">
                        <ModalSolicitarPermisoUnidadNegocio key="modal-solicitar-permiso-unidadNegocio" />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="datatable">
                        <DataTable
                            key="datatable-solicitar-un"
                            customStyles={customStyles}
                            columns={columnaUnidadesNegocio}
                            data={unidadesNegocio}
                            noHeader
                            highlightOnHover
                            striped
                            responsive
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
