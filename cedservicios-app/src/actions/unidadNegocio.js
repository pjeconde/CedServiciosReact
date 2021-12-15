import Swal from "sweetalert2";
import { fetchConToken } from "../config/fetch";
import { types } from "../types/types";
import { iniciarObtenerCuits } from "./cuit";
import { closeModal, finishLoading, setError, startLoading } from "./ui";

export const iniciarAgregarUnidadNegocio = (unidadNegocio) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchConToken('UnidadNegocio', unidadNegocio, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                Swal.fire('Success', 'Unidad de Negocio agregado con exito.', 'success');
                dispatch(iniciarObtenerCuits());
                dispatch(closeModal());
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
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

export const setUnidadNegocioActivo = (unidadNegocio) => ({
    type: types.cuitSetUnidadNegocioActivo,
    payload: unidadNegocio
});

export const removerUnidadNegocioActivo = () => ({ type: types.cuitRemoverUnidadNegocioActivo });

export const iniciarActualizarUnidadNegocio = (unidadNegocio) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const resp = await fetchConToken('UnidadNegocio', unidadNegocio, 'PUT');
            const body = await resp.json();
            if (body.datos) {
                Swal.fire('Success', 'Unidad de Negocio actualizado con exito.', 'success');
                dispatch(iniciarObtenerCuits());
                dispatch(closeModal());
            }
            else if (body.errors) {
                dispatch(setError(body.errors));
            }
            else if (body.exception) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: body.exception[0].detail });
            }

            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}

export const iniciarEliminarUnidadNegocio = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading());
            let { unidadNegocioActivo } = getState().cuit;
            let id = unidadNegocioActivo.id;

            const resp = await fetchConToken(`UnidadNegocio/${id}`, null, 'PUT');
            const body = await resp.json();

            if (body.datos) {
                dispatch(iniciarObtenerCuits());
                Swal.fire(
                    'Success',
                    `Unidad de Negocio ${unidadNegocioActivo.idEstado === 1 ? 'desactivado' : 'activado'} con exito.`,
                    'success'
                );
            }
            else {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
            }

            dispatch(finishLoading());

        } catch (error) {
            dispatch(finishLoading());
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ocurrió un error inesperado.' });
        }
    }
}