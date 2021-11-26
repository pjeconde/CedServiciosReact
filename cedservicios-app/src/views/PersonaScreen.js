import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import { BadgeStatus } from '../components/ui/BadgeStatus';
import { Expanded } from '../components/ui/Expanded';
import { ModalFiltro } from '../components/dashboardPrivate/persona/ModalFiltro';

import { ModalPersona } from '../components/dashboardPrivate/persona/ModalPersona';
import { ButtonActualizar } from '../components/ui/ButtonActualizar';
import { ButtonDetalle } from '../components/ui/ButtonDetalle';
import { ButtonEliminar } from '../components/ui/ButtonEliminar';
import { ButtonAgregar } from '../components/ui/ButtonAgregar';
import { ModalEliminar } from '../components/dashboardPrivate/persona/ModalEliminar';
import { FiltroAplicados } from '../components/ui/FiltroAplicados';
import { iniciarObtenerPersonas, iniciarSetPersonaActiva, removerFiltro, removerLosFiltros, removerPersonaActiva } from '../actions/persona';
import { setPaginaActual, setRegistrosPorPagina } from '../actions/grilla';
import { SortIcon } from '../components/ui/SortIcon';
import { PaginationOptions } from '../components/ui/PaginationOptions';
import { openModal } from '../actions/ui';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
        },
    },
}

export const PersonaScreen = () => {

    const dispatch = useDispatch();
    const { personas, filtro } = useSelector(state => state.persona);
    const { loading } = useSelector(state => state.ui);
    const { cuentaTotal } = useSelector(state => state.grilla);

    const columnaPersonas = [
        {
            name: 'Nº Documento',
            selector: 'numeroDocumento',
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 700,
            }
        },
        {
            name: 'Tipo documento',
            selector: 'tipoDocumento',
            cell: row => row.tipoDocumento?.descripcion,
        },
        {
            name: 'Razon social',
            selector: 'razonSocial',
            sortable: true,
            grow: 2
        },
        {
            name: 'Localidad',
            selector: 'localidad',
            sortable: true
        },
        {
            name: 'Nombre contacto',
            selector: 'nombreContacto',
            grow: 1.5,
            sortable: true
        },
        {
            name: 'Email',
            selector: 'emailContacto',
            grow: 2
        },
        {
            name: 'Estado',
            selector: 'estado',
            cell: row => <BadgeStatus status={row.estado.id === 1} text={row.estado.descripcion} />,
            center: true,
            grow: .5
        },
        {
            name: 'Detalle',
            cell: row => <ButtonDetalle row={row} handleOnClick={handleOnClickDetalle} />,
            center: true,
            grow: .5
        },
        {
            name: 'Modificar',
            cell: row => <ButtonActualizar row={row} handleOnClick={handleOnClickActualizar} />,
            center: true,
            grow: .5
        },
        {
            name: 'Eliminar',
            cell: row => <ButtonEliminar row={row} handleOnClick={handleOnClickEliminar} />,
            center: true,
            grow: .5
        }
    ];

    const handleEliminarFiltro = (f) => {
        let filtros = Object.entries(filtro).filter(([k, v], i) => !!v);

        if (filtros.length === 1) {
            handleEliminarFiltros();
        }
        else {
            dispatch(removerFiltro(f));
        }
    }

    const handleEliminarFiltros = () => {
        dispatch(removerLosFiltros());
        dispatch(iniciarObtenerPersonas());
    }

    const handleCambiarPagina = (pagina) => {
        dispatch(setPaginaActual(pagina));
        dispatch(iniciarObtenerPersonas());
    }

    const handleFilasPorPagina = (filas) => {
        dispatch(setRegistrosPorPagina(filas));
        dispatch(iniciarObtenerPersonas());
    }

    const handleOnClickAgregar = () => {
        let nameModal = 'modalPersona';
        let typeModal = 'Agregar';
        dispatch(removerPersonaActiva());
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickDetalle = (persona) => {
        let nameModal = 'modalPersona';
        let typeModal = 'Detalle';
        dispatch(iniciarSetPersonaActiva(persona));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickActualizar = (persona) => {
        let nameModal = 'modalPersona';
        let typeModal = 'Actualizar';
        dispatch(iniciarSetPersonaActiva(persona));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickEliminar = (persona) => {
        let nameModal = 'modalEliminarPersona';
        let typeModal = 'Eliminar';
        dispatch(iniciarSetPersonaActiva(persona));
        dispatch(openModal(nameModal, typeModal));
    }

    useEffect(() => {
        if (filtro) {
            dispatch(iniciarObtenerPersonas());
        }
    }, [filtro, dispatch])

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

                            <ButtonAgregar handleOnClick={handleOnClickAgregar} />

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
                                filtro &&
                                (
                                    <FiltroAplicados
                                        filtros={Object.keys(filtro).map(
                                            (i) => ({ key: i, value: filtro[i]?.value ? filtro[i].label : filtro[i] })
                                        )}
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
                                    sortIcon={<SortIcon />} />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
