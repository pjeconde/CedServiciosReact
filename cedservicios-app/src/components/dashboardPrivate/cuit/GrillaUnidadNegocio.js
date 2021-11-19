import React from 'react';
import { Table, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { BadgeStatus } from '../../ui/BadgeStatus';
import { ButtonActualizar } from '../../ui/ButtonActualizar';
import { ButtonEliminar } from '../../ui/ButtonEliminar';

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
            fontWeight: 600,
        },
    },
}

export const GrillaUnidadNegocio = ({ data }) => {

    const { unidadesNegocio } = data;

    const columnaUN = [
        {
            name: 'Descripcion',
            selector: 'descripcion',
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 700,
            },
            width: '300px'
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
            width: '100px'
        },
        {
            name: 'Eliminar',
            cell: row => <ButtonEliminar row={row} handleOnClick={handleOnClickEliminar} />,
            center: true,
            width: '100px'
        }
    ];;

    const handleOnClickActualizar = () => { }

    const handleOnClickEliminar = () => { }

    const handleOnClickAgregar = () => { }

    return (
        <div className="mx-5 w-75">
            <div className="container-fluid">
                <div className="header__wrapper header__sub my-2">
                    <div className="header__title">
                        <h4>Unidades de Negocio</h4>
                    </div>
                    <div className="header__toolbar mx-1">
                        <Button
                            type="button"
                            variant="secondary"
                            className="fas fa-plus"
                            onClick={handleOnClickAgregar} />
                    </div>
                </div>
            </div>
            <DataTable
                key="datatable-un"
                customStyles={customStyles}
                columns={columnaUN}
                data={unidadesNegocio}
                expandableRows={true}
                expandableRowsComponent={<ExpandedUn />}
                noHeader
                highlightOnHover
            />
        </div>
    )
}
