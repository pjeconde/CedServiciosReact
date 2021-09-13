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
                        Object.values(filtros).map((f, i) => (
                            <li key={i} className="filter__badge--dismissible">
                                <button onClick={() => eliminarFiltro(f)} type="button">
                                    <span className="mx-2 py-1" >&times;</span>
                                </button>
                                {f}
                            </li>
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
