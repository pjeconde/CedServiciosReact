import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import { BadgeStatus } from '../components/ui/BadgeStatus';
import { Expanded } from '../components/ui/Expanded';
import { InputFilter } from '../components/ui/InputFilter';
import { ModalFiltro } from '../components/dashboardPrivate/persona/ModalFiltro';

import { ButtonActualizar } from '../components/ui/personas/ButtonActualizar';
import { ModalPersona } from '../components/dashboardPrivate/persona/ModalPersona';
import { ButtonAgregar } from '../components/ui/personas/ButtonAgregar';
import { ButtonDetalle } from '../components/ui/personas/ButtonDetalle';
import { ButtonEliminar } from '../components/ui/personas/ButtonEliminar';
import { ModalEliminar } from '../components/dashboardPrivate/persona/ModalEliminar';

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
        selector: 'numeroDocumento',
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
        name: 'Detalle',
        cell: row => <ButtonDetalle persona={row} />,
        center: true
    },
    {
        name: 'Modificar',
        cell: row => <ButtonActualizar persona={row} />,
        center: true
    },
    {
        name: 'Eliminar',
        cell: row => <ButtonEliminar persona={row} />,
        center: true
    }
];

export const PersonaScreen = () => {

    const { personas } = useSelector(state => state.persona);

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

                            <ButtonAgregar />

                            <ModalFiltro />

                            <ModalPersona />

                            <ModalEliminar />
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
                                    keyField="numeroDocumento"
                                    columns={columnaPersonas}
                                    data={personas}
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
