import Swal from "sweetalert2";
import { fetchConToken } from "../config/fetch";
import { types } from "../types/types";
import { closeModal, finishLoading, startLoading } from "./ui";


export const iniciarSolicitarPermisoCuit = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            const { cuitActivo } = getState().cuit;

            const resp = await fetchConToken('SolicitudPermiso/Cuit', { idCuit: cuitActivo.id }, 'POST');
            const body = await resp.json();

            if (body.datos) {
                dispatch(obtenerSolicitudesPermisosCuitGeneradas());
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
                dispatch(obtenerSolicitudesPermisosUnidadNegocioGeneradas());
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

export const obtenerSolicitudesPermisosCuitGeneradas = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchConToken('SolicitudPermiso/Cuits/Generadas');
            const body = await resp.json();

            if (body.datos) {
                dispatch(cargarSolicitudesPermisoCuit(body.datos));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

            dispatch(finishLoading());

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(finishLoading());
        }
    }
}

const cargarSolicitudesPermisoCuit = (solicitudesCuit) => ({
    type: types.solicitudPermisoCargarSolicitudesCuitGeneradas,
    payload: solicitudesCuit
});

const cargarSolicitudesPermisoUnidadNegocio = (solicitudesUN) => ({
    type: types.solicitudPermisoCargarSolicitudesUnidadNegocioGeneradas,
    payload: solicitudesUN
});

export const obtenerSolicitudesPermisosUnidadNegocioGeneradas = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchConToken('SolicitudPermiso/UnidadesNegocio/Generadas');
            const body = await resp.json();

            if (body.datos) {
                dispatch(cargarSolicitudesPermisoUnidadNegocio(body.datos));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

            dispatch(finishLoading());

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            dispatch(finishLoading());
        }
    }
}