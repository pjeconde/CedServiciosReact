import React from 'react';
import { Button, Table } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../actions/ui';
import { setUnidadNegocioActivo } from '../../../actions/unidadNegocio';
import { BadgeStatus } from '../../ui/BadgeStatus';
import { ButtonActualizar } from '../../ui/ButtonActualizar';
import { ButtonEliminar } from '../../ui/ButtonEliminar';
import { ModalUnidadNegocio } from './ModalUnidadNegocio';

const ExpandedUn = () => {
    return (
        <div className="w-auto">
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th colSpan="2" className="text-center" >Punto de ventas</th>
                    </tr>
                    <tr>
                        <th>Descripcion</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Punto de venta default</td>
                        <td>Vigente</td>
                    </tr>
                    {/* {
                    unidadesNegocio?.map((un) => (
                        <tr key={un.id}>
                            <td>{un.descripcion}</td>
                            <td>{un.estado.descripcion}</td>
                        </tr>
                    ))
                } */}
                </tbody>
            </Table>
        </div>
    )
}

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

    const { unidadesNegocio } = cuit;
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
            cell: row => <ButtonActualizar row={row} handleOnClick={handleOnClickActualizar} />,
            center: true,
            width: '15%',
            grow: .5
        },
        {
            name: 'Eliminar',
            cell: row => <ButtonEliminar row={row} handleOnClick={handleOnClickEliminar} />,
            center: true,
            width: '15%',
            grow: .5,
        }
    ];;

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
        dispatch(openModal(nameModal, typeModal));
    }

    return (
        <div className="mx-5 my-4 w-50">
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
                            onClick={handleOnClickAgregar} />

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
                            expandableRowsComponent={<ExpandedUn />}
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
