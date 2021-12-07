import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { iniciarSetCuitActivo, removerCuitActivo } from '../../../actions/cuit';
import { openModal } from '../../../actions/ui';
import { removerUnidadNegocioActivo, setUnidadNegocioActivo } from '../../../actions/unidadNegocio';
import { existePermisoDeAdmin } from '../../../helpers/tipoPermisos';
import { BadgeStatus } from '../../ui/BadgeStatus';
import { ButtonActualizar } from '../../ui/ButtonActualizar';
import { CheckStatus } from '../../ui/CheckStatus';
import { GrillaPuntoVenta } from '../puntoVenta/GrillaPuntoVenta';
import { ModalUnidadNegocio } from './ModalUnidadNegocio';


const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 500,
        },
    },
}
const nameModal = 'modalUnidadNegocio';

export const GrillaUnidadNegocio = ({ data: cuit }) => {

    const { unidadesNegocio, tipoPermisos } = cuit;
    const dispatch = useDispatch();

    const columnaUN = [
        {
            name: 'Descripcion',
            selector: 'descripcion',
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 700,
            },
            width: '250px'
        },
        {
            name: 'Estado',
            selector: 'estado',
            cell: row => <BadgeStatus status={row.estado.id === 1} text={row.estado.descripcion} />,
            grow: .5
        },
        {
            name: 'Modificar',
            cell: row => <ButtonActualizar row={row} handleOnClick={handleOnClickActualizar} disabled={!existePermisoDeAdmin(row.tipoPermisos)} />,
            center: true,
            width: '15%',
            grow: .5
        },
        {
            name: 'Alta/Baja',
            cell: row => <CheckStatus row={row} handleOnClick={handleOnClickEliminar} disabled={!existePermisoDeAdmin(row.tipoPermisos)} />,
            center: true,
            width: '15%',
            grow: .5,
        }
    ];

    const handleOnClickActualizar = (unidadNegocio) => {
        let typeModal = 'Actualizar';
        dispatch(setUnidadNegocioActivo(unidadNegocio));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickEliminar = (unidadNegocio) => {
        let typeModal = 'Eliminar';
        dispatch(setUnidadNegocioActivo(unidadNegocio));
        dispatch(openModal(nameModal, typeModal));
    }

    const handleOnClickAgregar = () => {
        let typeModal = 'Agregar';
        dispatch(removerUnidadNegocioActivo());
        dispatch(openModal(nameModal, typeModal));
    }

    useEffect(() => {
        if (cuit) {
            dispatch(iniciarSetCuitActivo(cuit));
        }
    }, [cuit, dispatch])

    useEffect(() => {
        return () => {
            dispatch(removerCuitActivo());
        }
    }, [dispatch])

    return (
        <div className="mx-5 my-4 w-75">
            <div className="container-fluid">
                <div className="header__wrapper header__sub my-2">
                    <div className="header__title_sub">
                        <h4>Unidades de Negocio</h4>
                    </div>
                    <div className="header__toolbar mx-1">
                        <Button
                            type="button"
                            variant="secondary"
                            className="fas fa-plus"
                            onClick={handleOnClickAgregar}
                            disabled={!existePermisoDeAdmin(tipoPermisos)} />

                        <ModalUnidadNegocio key={cuit.id} cuit={cuit} />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="datatable">
                        <DataTable
                            key="datatable-un"
                            customStyles={customStyles}
                            columns={columnaUN}
                            data={unidadesNegocio}
                            expandableRows={true}
                            expandableRowsComponent={<GrillaPuntoVenta />}
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
