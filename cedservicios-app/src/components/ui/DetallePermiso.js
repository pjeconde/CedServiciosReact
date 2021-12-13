import React from 'react';

export const DetallePermiso = ({ tipoPermisos = [] }) => {
    return (
        <div>
            {
                (tipoPermisos.length > 0)
                    ?
                    tipoPermisos.map((tp, i) => (i === 0) ? tp.descripcion : ` / ${tp.descripcion}`)
                    :
                    'Ninguno'
            }
        </div>
    )
}
