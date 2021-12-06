import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';

import { BadgeStatus } from '../../ui/BadgeStatus';
import { ButtonActualizar } from '../../ui/ButtonActualizar';
import { ButtonEliminar } from '../../ui/ButtonEliminar';
import { ButtonDetalle } from '../../ui/ButtonDetalle';
import { existePermisoDeAdmin } from '../../../helpers/tipoPermisos';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../actions/ui';
import { iniciarSetPuntoVentaActivo } from '../../../actions/puntoVenta';
import { ModalPuntoVenta } from './ModalPuntoVenta';
import { removerUnidadNegocioActivo, setUnidadNegocioActivo } from '../../../actions/unidadNegocio';

const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 500,
        },
    },
}
const nameModal = 'modalPuntoVenta';

export const GrillaPuntoVenta = ({ data: unidadNegocio }) => {

    const { puntosVenta, tipoPermisos } = unidadNegocio || [];
    const dispatch = useDispatch();

    const columnaPuntoVenta = [
        {
            name: 'Nº Punto de Venta',
            selector: 'numeroPuntoVenta',
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 700,
            },
            grow: .5
        },
        {
            name: 'Tipo',
            selector: 'tipoPuntoVenta.descripcion',
            grow: .5
        },
        {
            name: 'Estado',
            selector: 'estado',
            cell: row => <BadgeStatus status={row.estado.id === 1} text={row.estado.descripcion} />,
            grow: .5
        },
        {
            name: 'Detalle',
            cell: row => <ButtonDetalle row={row} handleOnClick={handleOnClickDetalle} />,
            center: true,
            width: '12%'
        },
        {
            name: 'Modificar',
            cell: row => <ButtonActualizar row={row} handleOnClick={handleOnClickActualizar} disabled={existePermisoDeAdmin(row.tipoPermisos)} />,
            center: true,
            width: '12%',
        },
        {
            name: 'Eliminar',
            cell: row => <ButtonEliminar row={row} handleOnClick={handleOnClickEliminar} disabled={!existePermisoDeAdmin(row.tipoPermisos)} />,
            center: true,
            width: '12%',
        }
    ];

    const handleOnClickDetalle = (puntoVenta) => {
        let typeModal = 'Detalle';
        dispatch(iniciarSetPuntoVentaActivo(puntoVenta));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickActualizar = (puntoVenta) => {
        let typeModal = 'Actualizar';
        dispatch(iniciarSetPuntoVentaActivo(puntoVenta));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickEliminar = (puntoVenta) => {
        let typeModal = 'Eliminar';
        dispatch(iniciarSetPuntoVentaActivo(puntoVenta));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickAgregar = () => {
        let typeModal = 'Agregar';
        dispatch(openModal(nameModal, typeModal));
    }

    useEffect(() => {
        if (unidadNegocio) {
            dispatch(setUnidadNegocioActivo(unidadNegocio));
        }
    }, [unidadNegocio, dispatch])

    useEffect(() => {
        return () => {
            dispatch(removerUnidadNegocioActivo());
        }
    }, [dispatch])

    return (
        <div className="mx-5 my-4 w-auto">
            <div className="container-fluid">
                <div className="header__wrapper header__sub my-2">
                    <div className="header__title_sub">
                        <h4>Puntos de Venta</h4>
                    </div>
                    <div className="header__toolbar mx-1">
                        <Button
                            type="button"
                            variant="secondary"
                            className="fas fa-plus"
                            onClick={handleOnClickAgregar}
                            disabled={!existePermisoDeAdmin(tipoPermisos)}
                        />

                        <ModalPuntoVenta key={unidadNegocio.id} unidadNegocio={unidadNegocio} />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="datatable">
                        <DataTable
                            key="datatable-un"
                            customStyles={customStyles}
                            columns={columnaPuntoVenta}
                            data={puntosVenta}
                            noHeader
                            highlightOnHover
                            striped
                            responsive />
                    </div>
                </div>
            </div>
        </div>
    )
}
