import React from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';

import { CheckIcon } from '../../ui/CheckIcon';
import { RejectedIcon } from '../../ui/RejectedIcon';
import { PendingIcon } from '../../ui/PendingIcon';

const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
        },
    },
}

const solicitudesUnidadNegocio = [
    {
        id: 2,
        descripcion: 'Carrefour Don Torcuato',
        cuit: '55646646445',
        fechaCreacion: moment().add(5, 'M').format("YYYY-MM-DD"),
        estado: {
            id: 2,
            descripcion: 'Inactivo'
        }
    },
    {
        id: 3,
        descripcion: 'Carrefour Pacheco',
        cuit: '55646646445',
        fechaCreacion: moment().add(2, 'M').format("YYYY-MM-DD"),
        estado: {
            id: 1,
            descripcion: 'Vigente'
        }
    },
    {
        id: 10,
        descripcion: 'Predefinida',
        cuit: '65655665445',
        fechaCreacion: moment().format("YYYY-MM-DD"),
        estado: {
            id: 3,
            descripcion: 'Pendiente'
        }
    }
];

export const GrillaSolicitudesUnidadNegocio = () => {

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
            name: 'Descripcion',
            selector: 'descripcion'
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
                                data={solicitudesUnidadNegocio}
                                columns={columnaSolicitudesUnidadNegocio}
                                customStyles={customStyles}
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
