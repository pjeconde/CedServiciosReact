import Swal from "sweetalert2";
import { types } from "../types/types";


export const iniciarSetCuitActivo = (cuit) => {
    return (dispatch) => {
        try {
            dispatch(setCuitActivo(cuit));

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const setCuitActivo = (cuit) => ({
    type: types.solicitudPermisoSetCuitActivo,
    payload: cuit
});

export const iniciarRemoverCuitActivo = () => ({ type: types.solicitudPermisoRemoverCuitActivo });

export const iniciarSetUnidadNegocioActivo = (unidadNegocio) => {
    return (dispatch) => {
        try {
            dispatch(setUnidadNegocioActivo(unidadNegocio));

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

const setUnidadNegocioActivo = (unidadNegocio) => ({
    type: types.solicitudPermisoSetUnidadNegocioActivo,
    payload: unidadNegocio
});

export const iniciarRemoverUnidadNegocioActivo = () => ({ type: types.solicitudPermisoRemoverUnidadNegocioActivo });

// export const iniciarSolicitarPermisoCuit = () => {
//     return async (dispatch) => {
//         try {
//             dispatch(startLoading());

//             const resp = await fetchConToken('PuntoVenta', puntoVentaDto, 'POST');
//             const body = await resp.json();

//             if (resp.status === 200) {
//                 Swal.fire({ title: 'Realizado.', text: 'Punto de Venta agregado con exito.', icon: 'success' });
//                 dispatch(iniciarObtenerCuits());
//                 dispatch(closeModal());
//             }
//             else if (body.errors) {
//                 dispatch(setError(body.errors));
//             }
//             else if (body.exception) {
//                 Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
//             }

//             dispatch(finishLoading());
//         } catch (error) {
//             console.error(error);
//             Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
//             dispatch(finishLoading());
//         }
//     }
// }