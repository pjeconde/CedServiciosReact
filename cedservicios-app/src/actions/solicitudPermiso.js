import Swal from "sweetalert2";
import { fetchConToken } from "../config/fetch";
import { closeModal, finishLoading, startLoading } from "./ui";


export const iniciarSolicitarPermisoCuit = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            const { cuitActivo } = getState().cuit;

            const resp = await fetchConToken('SolicitudPermiso/Cuit', { idCuit: cuitActivo.id }, 'POST');
            const body = await resp.json();

            if (body.datos) {
                Swal.fire({ title: 'Realizado.', text: `Solicitud de permiso para el Cuit ${cuitActivo.cuit} enviada.`, icon: 'success' });
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

            dispatch(finishLoading());
            dispatch(closeModal());

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(finishLoading());
        }
    }
}

export const iniciarSolicitarPermisoUnidadNegocio = (idTipoPermiso) => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            const { unidadNegocioActivo } = getState().cuit;
            const { id, idCuit, descripcion } = unidadNegocioActivo;

            const resp = await fetchConToken('SolicitudPermiso/UnidadNegocio',
                {
                    idCuit,
                    idUnidadNegocio: id,
                    idTipoPermiso
                },
                'POST');
            const body = await resp.json();

            if (body.datos) {
                Swal.fire({ title: 'Realizado.', text: `Solicitud de permiso para la Unidad de Negocio ${descripcion} enviada.`, icon: 'success' });
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

            dispatch(finishLoading());
            dispatch(closeModal());

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(finishLoading());
        }
    }
}