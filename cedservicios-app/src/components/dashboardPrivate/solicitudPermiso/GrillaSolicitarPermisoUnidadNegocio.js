import React from 'react';

import DataTable from 'react-data-table-component';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 800,
        },
    },
}

export const GrillaSolicitarPermisoUnidadNegocio = ({ data: unidadesNegocio }) => {

    const columnaUnidadesNegocio = [
        {

        }
    ];

    return (
        <div className="mx-5 my-4 w-75">
            <div className="container-fluid">
                <div className="header__wrapper header__sub my-2">
                    <div className="header__title_sub mb-auto">
                        <h4>Unidades de Negocio</h4>
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
