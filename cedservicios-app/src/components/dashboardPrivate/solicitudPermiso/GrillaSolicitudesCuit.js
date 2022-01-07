import React from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';

const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
        },
    },
}


const solicitudesCuit = [
    {
        cuit: '65655665445',
        fechaCreacion: moment().format("YYYY-MM-DD"),
        estado: 'Pendiente'
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
            grow: 1
        },
        {
            name: 'Estado',
            selector: 'estado',
            grow: 1,
        },
    ];

    return (
        <div >
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper">
                        <div className="header__title">
                            <h4>Solicitudes de Permisos para un Cuit</h4>
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
