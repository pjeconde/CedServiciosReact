import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import { ButtonSolicitar } from '../../ui/ButtonSolicitar';
import { InputFilter } from '../../ui/InputFilter';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 800,
        },
    },
}

const cuit = [
    {
        id: 10,
        cuit: '20398724357',
        razonSocial: 'German Company',
        nombreContacto: 'German Montiel',
        unidadesNegocio: [
            {
                id: 3,
                descripcion: 'Predefinida'
            }
        ]
    }
];

export const GrillaSolicitarPermisoCuit = () => {

    const [filterText, setFilterText] = useState('');

    const columnaCuits = [
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
            name: 'Razon social',
            selector: 'razonSocial',
            grow: 1
        },
        {
            name: 'Nombre contacto',
            selector: 'nombreContacto',
            grow: 1,
        },
        {
            name: 'Permisos',
            cell: row => <ButtonSolicitar row={row} handleOnClick={handleOnClickSolicitar} />,
            center: true,
            grow: .5
        },
    ];

    const handleOnChangeFilterText = (value) => setFilterText(value);

    const handleOnClickSolicitar = (cuit) => console.log(cuit);

    return (
        <div >
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper my-3">
                        <div className="header__title mt-3">
                            <h2>Solicitar permiso para un Cuit o Unidad de Negocio</h2>
                        </div>
                        <div className="header__toolbar">

                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div className="card">
                    <div className="card-body">
                        <div className="datatable">
                            <DataTable
                                key="datatable-solicitar-cuit"
                                keyField="id"
                                data={cuit}
                                columns={columnaCuits}
                                expandableRows={true}
                                // expandableRowsComponent={}
                                customStyles={customStyles}
                                striped
                                responsive
                                noHeader
                                subHeader
                                subHeaderAlign="left"
                                subHeaderComponent={
                                    <InputFilter
                                        key={'busqueda-solicitud-cuit'}
                                        id={'buscar-solicitud-cuit'}
                                        onFilter={handleOnChangeFilterText}
                                        filterText={filterText}
                                        placeholder='Cuit...'
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
