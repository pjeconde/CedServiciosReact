import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import 'moment/locale/es';

import { CheckIcon } from '../../../ui/CheckIcon';
import { PendingIcon } from '../../../ui/PendingIcon';
import { RejectedIcon } from '../../../ui/RejectedIcon';
import { EmptyState } from '../../../ui/EmptyState';
import { obtenerSolicitudesPermisosCuitGeneradas } from '../../../../actions/solicitudPermiso';


moment.locale('es');
const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
        },
    },
}

export const GrillaSolicitudesCuit = () => {

    const dispatch = useDispatch();
    const { solicitudesCuitGeneradas } = useSelector(state => state.solicitudPermiso);

    const columnaSolicitudesCuit = [
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
        dispatch(obtenerSolicitudesPermisosCuitGeneradas());
    }, [dispatch])

    return (
        <div >
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper">
                        <div className="header__title">
                            <h4>Solicitudes de Permisos sobre Cuits</h4>
                        </div>

                    </div>
                </div>
            </header>
            <section>
                <div className="card">
                    <div className="card-body">
                        <div className="datatable">
                            <DataTable
                                key="datatable-solicitudes-cuit"
                                keyField="id"
                                data={solicitudesCuitGeneradas}
                                columns={columnaSolicitudesCuit}
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
