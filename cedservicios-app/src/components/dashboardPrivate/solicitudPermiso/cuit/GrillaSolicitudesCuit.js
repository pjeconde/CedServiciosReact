import React from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import 'moment/locale/es';
import { CheckIcon } from '../../../ui/CheckIcon';
import { PendingIcon } from '../../../ui/PendingIcon';
import { RejectedIcon } from '../../../ui/RejectedIcon';
import { EmptyState } from '../../../ui/EmptyState';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
        },
    },
}

moment.locale('es');

const solicitudesCuit = [
    {
        cuit: '65655665445',
        fechaCreacion: moment().format("YYYY-MM-DD"),
        estado: {
            id: 3,
            descripcion: 'Pendiente'
        }
    },
    {
        cuit: '20398724357',
        fechaCreacion: moment().add(1, 'M').format("YYYY-MM-DD"),
        estado: {
            id: 1,
            descripcion: 'Vigente'
        }
    },
    {
        cuit: '65655665445',
        fechaCreacion: moment().add(2, 'M').format("YYYY-MM-DD"),
        estado: {
            id: 2,
            descripcion: 'Inactivo'
        }
    }
];

export const GrillaSolicitudesCuit = () => {

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
            center: true
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

    return (
        <div >
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper">
                        <div className="header__title">
                            <h4>Solicitudes de Permisos Cuits</h4>
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
                                data={solicitudesCuit}
                                columns={columnaSolicitudesCuit}
                                customStyles={customStyles}
                                noDataComponent={<EmptyState />}
                                striped
                                responsive
                                noHeader
                            // subHeader
                            // subHeaderAlign="left"
                            // subHeaderComponent={
                            //     <InputFilter
                            //         key={'busqueda-solicitud-cuit'}
                            //         id={'buscar-solicitud-cuit'}
                            //         onFilter={handleOnChangeFilterText}
                            //         filterText={filterText}
                            //         placeholder='Cuit...'
                            //     />
                            // }
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
