import React, { useState } from 'react';

import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { BadgeStatus } from '../components/ui/BadgeStatus';
import { Expanded } from '../components/ui/Expanded';
import { InputFilter } from '../components/ui/InputFilter';
import { ModalFilter } from '../components/dashboardPrivate/persona/ModalFilter';

import Personas from '../data-static/persona/personas.json';
import { ModalAdd } from '../components/dashboardPrivate/persona/ModalAdd';

export const PaginationOptions = { rowsPerPageText: 'Filas por pagina' };


const columnaPersonas = [
    {
        name: 'Cuit',
        selector: 'cuit',
        style: {
            color: '#202124',
            fontSize: '14px',
            fontWeight: 700,
        }
    },
    // {
    //     name: 'TipoDni',
    //     selector: 'tipoDni',
    // },
    {
        name: 'Dni',
        selector: 'dni',
        sortable: true
    },
    {
        name: 'RazonSocial',
        selector: 'razonSocial'
    },
    {
        name: 'Direccion',
        selector: 'direccion'
    },
    {
        name: 'Localidad',
        selector: 'localidad'
    },
    // {
    //     name: 'C.P',
    //     selector: 'codigoPostal'
    // },
    {
        name: 'NombreContacto',
        selector: 'nombreContacto',
        sortable: true,
        grow: 2
    },
    // {
    //     name: 'Telefono',
    //     selector: 'telefono'
    // },
    {
        name: 'Email',
        selector: 'email'
    },
    {
        name: 'Estado',
        selector: 'estado',
        cell: row => <BadgeStatus status={row.estado} text={row.estado ? 'Activo' : 'Inactivo'} />,
        center: true
    },
    {
        name: 'Modificar',
        cell: () => <Button variant="secondary" size="sm"><i className="fas fa-edit"></i></Button>,
        center: true
    },
    {
        name: 'Eliminar',
        cell: () => <Button variant="danger" size="sm"><i className="fas fa-trash"></i></Button>,
        center: true
    }
];

const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
            // textTransform: 'uppercase',
        },
    },
}

export const PersonaScreen = () => {

    const [filterText, setFilterText] = useState('');

    const handleOnChangeFilterText = (value) => {
        setFilterText(value);
    }

    return (
        <div>
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper my-3">
                        <div className="header__title">
                            <h1>Personas</h1>
                        </div>
                        <div className="header__toolbar">
                            <ModalAdd />

                            <ModalFilter />
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="datatable">
                                <DataTable
                                    key="datatable-personas"
                                    keyField="cuit"
                                    columns={columnaPersonas}
                                    data={Personas}
                                    pagination
                                    paginationTotalRows={50}
                                    paginationComponentOptions={PaginationOptions}
                                    expandableRows={true}
                                    expandableRowsComponent={<Expanded />}
                                    customStyles={customStyles}
                                    striped
                                    responsive
                                    noHeader
                                    highlightOnHover
                                    subHeader
                                    subHeaderAlign="left"
                                    subHeaderComponent={
                                        <InputFilter
                                            key={'busqueda-persona'}
                                            id={'buscar-persona'}
                                            onFilter={handleOnChangeFilterText}
                                            filterText={filterText} />}
                                    sortIcon={<i className="fas fa-chevron-down"></i>} />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
