import React, { useEffect } from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';

import { CheckIcon } from '../../../ui/CheckIcon';
import { RejectedIcon } from '../../../ui/RejectedIcon';
import { PendingIcon } from '../../../ui/PendingIcon';
import { EmptyState } from '../../../ui/EmptyState';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerSolicitudesPermisosUnidadNegocioGeneradas } from '../../../../actions/solicitudPermiso';

const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
        },
    },
}

export const GrillaSolicitudesUnidadNegocio = () => {

    const dispatch = useDispatch();
    const { solicitudesUnidadNegocioGeneradas } = useSelector(state => state.solicitudPermiso);

    const columnaSolicitudesUnidadNegocio = [
        {
            name: 'Cuit',
            selector: 'cuit',
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 700,
            }
        },
        {
            name: 'Unidad Negocio',
            selector: 'unidadNegocio'
        },
        {
            name: 'Permiso',
            selector: 'tipoPermiso.descripcion'
        },
        {
            name: 'Fecha solicitado',
            selector: 'fechaCreacion',
            center: true,
            cell: row => moment(row.fechaCreacion).format("DD/MM/YYYY")
        },
        {
            name: 'Estado',
            selector: 'estado',
            center: true,
            cell: row => (row.estado.id === 1) ?
                <CheckIcon />
                :
                (row.estado.id === 2) ?
                    <RejectedIcon />
                    :
                    <PendingIcon />
        },
    ];

    useEffect(() => {
        dispatch(obtenerSolicitudesPermisosUnidadNegocioGeneradas());
    }, [dispatch])

    return (
        <div >
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper">
                        <div className="header__title">
                            <h4>Solicitudes de Permisos de Unidades de Negocio</h4>
                        </div>

                    </div>
                </div>
            </header>
            <section>
                <div className="card">
                    <div className="card-body">
                        <div className="datatable">
                            <DataTable
                                key="datatable-solicitudes-unidadNegocio"
                                data={solicitudesUnidadNegocioGeneradas}
                                columns={columnaSolicitudesUnidadNegocio}
                                customStyles={customStyles}
                                noDataComponent={<EmptyState />}
                                striped
                                responsive
                                noHeader
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
