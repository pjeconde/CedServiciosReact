import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import { BadgeStatus } from '../components/ui/BadgeStatus';
import { setPaginaActual, setRegistrosPorPagina } from '../actions/grilla';
import { SortIcon } from '../components/ui/SortIcon';
import { PaginationOptions } from '../components/ui/PaginationOptions';
import { iniciarObtenerCuits, iniciarSetCuitActivo, removerCuitActivo } from '../actions/cuit';
import { ButtonDetalle } from '../components/ui/ButtonDetalle';
import { ButtonActualizar } from '../components/ui/ButtonActualizar';
import { ButtonEliminar } from '../components/ui/ButtonEliminar';
import { ButtonAgregar } from '../components/ui/ButtonAgregar';
import { openModal } from '../actions/ui';
import { ModalCuit } from '../components/dashboardPrivate/cuit/ModalCuit';
import { ModalEliminar } from '../components/dashboardPrivate/cuit/ModalEliminar';
import { GrillaUnidadNegocio } from '../components/dashboardPrivate/unidadNegocio/GrillaUnidadNegocio';
import { existePermisoDeAdmin } from '../helpers/tipoPermisos';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 800,
        },
    },
}

export const CuitScreen = () => {

    const dispatch = useDispatch();
    const { cuits } = useSelector(state => state.cuit);
    const { cuentaTotal } = useSelector(state => state.grilla);
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
            cell: row => <ButtonDetalle row={row} handleOnClick={handleOnClickDetalle} />,
            center: true,
            grow: .5
        },
        {
            name: 'Modificar',
            cell: row => <ButtonActualizar
                row={row}
                handleOnClick={handleOnClickActualizar}
                disabled={!existePermisoDeAdmin(row.tipoPermisos)} />,
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

    const handleOnClickDetalle = (cuit) => {
        let nameModal = 'modalCuit';
        let typeModal = 'Detalle';
        dispatch(iniciarSetCuitActivo(cuit));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickActualizar = (cuit) => {
        let nameModal = 'modalCuit';
        let typeModal = 'Actualizar';
        dispatch(iniciarSetCuitActivo(cuit));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickEliminar = (cuit) => {
        let nameModal = 'modalEliminarCuit';
        let typeModal = 'Eliminar';
        dispatch(iniciarSetCuitActivo(cuit));
        dispatch(openModal(nameModal, typeModal));
    }

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

                            <ModalCuit />

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
                                    key="datatable-cuits"
                                    keyField="id"
                                    columns={columnaCuits}
                                    data={cuits}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={cuentaTotal}
                                    paginationDefaultPage={1}
                                    paginationComponentOptions={PaginationOptions}
                                    onChangePage={handleCambiarPagina}
                                    onChangeRowsPerPage={handleFilasPorPagina}
                                    expandableRows={true}
                                    expandableRowsComponent={<GrillaUnidadNegocio />}
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
