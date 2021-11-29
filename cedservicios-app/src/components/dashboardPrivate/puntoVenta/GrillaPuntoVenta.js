import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { BadgeStatus } from '../../ui/BadgeStatus';
import { ButtonActualizar } from '../../ui/ButtonActualizar';
import { ButtonEliminar } from '../../ui/ButtonEliminar';

const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '15px',
            fontWeight: 500,
        },
    },
}

export const GrillaPuntoVenta = ({ data: unidadNegocio }) => {

    const { puntosVenta } = unidadNegocio || [];

    const columnaPuntoVenta = [
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
    ];

    const handleOnClickActualizar = () => { }

    const handleOnClickEliminar = () => { }

    const handleOnClickAgregar = () => { }

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
                            onClick={handleOnClickAgregar} />

                        {/* <ModalUnidadNegocio key={cuit.id} cuit={cuit} /> */}
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
                            // expandableRows={true}
                            // expandableRowsComponent={<ExpandedUn />}
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
