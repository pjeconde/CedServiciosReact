import React from 'react';
import { Table } from 'react-bootstrap';

export const Expanded = ({ data }) => {

    const { unidadesNegocio } = data;

    return (
        <div className="mx-5 py-2 w-50">
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th colSpan="2" className="text-center" style={{ backgroundColor: '#f2f2f2f2' }} >Unidades de Negocio</th>
                    </tr>
                    <tr>
                        <th>Descripcion</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        unidadesNegocio?.map((un) => (
                            <tr key={un.id}>
                                <td>{un.descripcion}</td>
                                <td>{un.estado.descripcion}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
