import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { BadgeStatus } from '../components/ui/BadgeStatus';
import { Expanded } from '../components/ui/Expanded';
import { InputFilter } from '../components/ui/InputFilter';
import { ModalFilter } from '../components/dashboardPrivate/person/ModalFilter';

import { UpdatePerson } from '../components/ui/persons/UpdatePerson';
import { ModalPerson } from '../components/dashboardPrivate/person/ModalPerson';
import { AddPerson } from '../components/ui/persons/AddPerson';

export const PaginationOptions = { rowsPerPageText: 'Filas por pagina' };


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

const columnaPersonas = [
    {
        name: 'NumeroDocumento',
        selector: 'nroDocumento',
        center: true,
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
    // {
    //     selector: 'tipoPersona',
    //     omit: true,
    //     cell: row => row.tipoPersona.label
    // },
    {
        name: 'TipoDocumento',
        selector: 'tipoDocumento',
        cell: row => row.tipoDocumento.label,
        sortable: true
    },
    {
        name: 'RazonSocial',
        selector: 'razonSocial'
    },
    {
        name: 'Direccion',
        cell: (row) => `${row.calle} ${row.nro}`
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
        cell: row => <UpdatePerson person={row} />,
        center: true
    },
    {
        name: 'Eliminar',
        cell: () => <Button variant="danger" size="sm"><i className="fas fa-trash"></i></Button>,
        center: true
    }
];

export const PersonaScreen = () => {

    const { persons } = useSelector(state => state.person);

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

                            <AddPerson />

                            <ModalFilter />

                            <ModalPerson />
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
                                    keyField="nroDocumento"
                                    columns={columnaPersonas}
                                    data={persons}
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
