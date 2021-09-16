import React from 'react';
import { Button } from 'react-bootstrap';

export const FiltroAplicados = ({ filtros, eliminarFiltro, eliminarFiltros }) => {
    
    return (
        <div className="filter__container">
            <span>Filtrado por:</span>
            <ul>
                {
                    filtros &&
                    (
                        filtros.map(({ key, value }) => (
                            value &&
                            (
                                <li key={key} className="filter__badge--dismissible">
                                    <button onClick={() => eliminarFiltro(key)} type="button">
                                        <span className="mx-2 py-1" >&times;</span>
                                    </button>
                                    {value}
                                </li>
                            )
                        ))
                    )
                }
                <li>
                    <Button className="link-secondary link" variant="link" type="reset" onClick={eliminarFiltros}>
                        Eliminar filtros
                    </Button>
                </li>
            </ul>
        </div>
    )
}
