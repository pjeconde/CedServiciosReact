import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import { BadgeStatus } from '../components/ui/BadgeStatus';
import { Expanded } from '../components/ui/Expanded';

import { setPaginaActual, setRegistrosPorPagina } from '../actions/grilla';
import { SortIcon } from '../components/ui/SortIcon';
import { PaginationOptions } from '../components/ui/PaginationOptions';
import { iniciarObtenerCuits, removerCuitActivo } from '../actions/cuit';
import { ButtonDetalle } from '../components/ui/cuit/ButtonDetalle';
import { ButtonActualizar } from '../components/ui/cuit/ButtonActualizar';
import { ButtonEliminar } from '../components/ui/cuit/ButtonEliminar';
import { ButtonAgregar } from '../components/ui/ButtonAgregar';
import { openModal } from '../actions/ui';
import { ModalCuit } from '../components/dashboardPrivate/cuit/ModalCuit';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 600,
        },
    },
}

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
        cell: row => <ButtonDetalle cuit={row} />,
        center: true,
        grow: .5
    },
    {
        name: 'Modificar',
        cell: row => <ButtonActualizar cuit={row} />,
        center: true,
        grow: .5
    },
    {
        name: 'Eliminar',
        cell: row => <ButtonEliminar cuit={row} />,
        center: true,
        grow: .5
    }
];

export const CuitScreen = () => {

    const dispatch = useDispatch();
    const { cuits } = useSelector(state => state.cuit);
    const { loading } = useSelector(state => state.ui);
    const { cuentaTotal } = useSelector(state => state.grilla);

    // const handleEliminarFiltro = (f) => {
    //     let filtros = Object.entries(filtro).filter(([k, v], i) => !!v);

    //     if (filtros.length === 1) {
    //         handleEliminarFiltros();
    //     }
    //     else {
    //         dispatch(removerFiltro(f));
    //     }
    // }

    // const handleEliminarFiltros = () => {
    //     dispatch(removerLosFiltros());
    //     dispatch(iniciarObtenerCuits());
    // }

    const handleCambiarPagina = (pagina) => {
        dispatch(setPaginaActual(pagina));
        dispatch(iniciarObtenerCuits());
    }

    const handleFilasPorPagina = (filas) => {
        dispatch(setRegistrosPorPagina(filas));
        dispatch(iniciarObtenerCuits());
    }

    const handleOnClickAgregar = () => {
        let nameModal = 'modalCuit';
        let typeModal = 'Agregar';
        dispatch(removerCuitActivo());
        dispatch(openModal(nameModal, typeModal));
    }

    // useEffect(() => {
    //     if (filtro) {
    //         dispatch(iniciarObtenerPersonas());
    //     }
    // }, [filtro, dispatch])

    useEffect(() => {
        dispatch(iniciarObtenerCuits());
    }, [dispatch])

    return (
        <div>
            <header>
                <div className="container-fluid">
                    <div className="header__wrapper my-3">
                        <div className="header__title">
                            <h1>Cuits</h1>
                        </div>
                        <div className="header__toolbar">

                            <ButtonAgregar handleOnClick={handleOnClickAgregar} />

                            {/* <ModalFiltro /> */}

                            <ModalCuit />

                            {/* <ModalEliminar /> */}
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            {/* {
                                filtro &&
                                (
                                    <FiltroAplicados
                                        filtros={Object.keys(filtro).map(
                                            (i) => ({ key: i, value: filtro[i]?.value ? filtro[i].label : filtro[i] })
                                        )}
                                        eliminarFiltro={handleEliminarFiltro}
                                        eliminarFiltros={handleEliminarFiltros} />
                                )
                            } */}
                            <div className="datatable">
                                <DataTable
                                    key="datatable-cuits"
                                    keyField="id"
                                    columns={columnaCuits}
                                    data={cuits}
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
