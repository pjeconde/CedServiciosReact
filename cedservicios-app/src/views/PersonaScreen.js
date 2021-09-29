import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { FiltroAplicados } from '../components/ui/FiltroAplicados';
import { iniciarObtenerPersonas, removerFiltro, removerLosFiltros } from '../actions/persona';
import { setPaginaActual, setRegistrosPorPagina } from '../actions/grilla';

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
    {
        name: 'TipoDocumento',
        selector: 'tipoDocumento',
        cell: row => row.tipoDocumento?.descripcion,
        sortable: true
    },
    {
        name: 'RazonSocial',
        selector: 'razonSocial'
    },
    {
        name: 'Localidad',
        selector: 'domicilio.localidad'
    },
    // {
    //     name: 'C.P',
    //     selector: 'codigoPostal'
    // },
    {
        name: 'NombreContacto',
        selector: 'contacto.nombre',
        sortable: true,
        grow: 2
    },
    // {
    //     name: 'Telefono',
    //     selector: 'telefono'
    // },
    {
        name: 'Email',
        selector: 'contacto.email'
    },
    {

        name: 'Estado',
        selector: 'estado',
        cell: row => <BadgeStatus status={row.estado.id === 1} text={row.estado.descripcion} />,
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

    const dispatch = useDispatch();
    const { personas, filtro } = useSelector(state => state.persona);
    const { loading } = useSelector(state => state.ui);
    const { cuentaTotal } = useSelector(state => state.grilla);
    const [filtrosAplicado, setFiltrosAplicado] = useState([]);
    const [filterText, setFilterText] = useState('');

    const handleOnChangeFilterText = (value) => {
        setFilterText(value);
    }

    const handleEliminarFiltro = (f) => {
        dispatch(removerFiltro(f));
    }

    const handleEliminarFiltros = () => {
        dispatch(removerLosFiltros());
    }

    const handleCambiarPagina = (pagina) => {
        dispatch(setPaginaActual(pagina));
        dispatch(iniciarObtenerPersonas());
    }

    const handleFilasPorPagina = (filas) => {
        dispatch(setRegistrosPorPagina(filas));
        dispatch(iniciarObtenerPersonas());
    }

    useEffect(() => {
        if (filtro) {
            setFiltrosAplicado(Object.keys(filtro).map(
                (i) => ({ key: i, value: filtro[i]?.value ? filtro[i].value : filtro[i] })
            ));
        }
        else {
            setFiltrosAplicado([]);
        }
    }, [filtro])

    useEffect(() => {
        dispatch(iniciarObtenerPersonas());
    }, [dispatch])

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
                            {
                                filtrosAplicado.length > 0 &&
                                (
                                    <FiltroAplicados
                                        filtros={filtrosAplicado}
                                        eliminarFiltro={handleEliminarFiltro}
                                        eliminarFiltros={handleEliminarFiltros} />
                                )
                            }
                            <div className="datatable">
                                <DataTable
                                    key="datatable-personas"
                                    keyField="id"
                                    columns={columnaPersonas}
                                    data={personas}
                                    progressPending={loading}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={cuentaTotal}
                                    paginationDefaultPage={1}
                                    paginationComponentOptions={PaginationOptions}
                                    onChangePage={handleCambiarPagina}
                                    onChangeRowsPerPage={handleFilasPorPagina}
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
